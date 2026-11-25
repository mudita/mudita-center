/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  SerialPortChangedDevices,
  SerialPortDeviceId,
  SerialPortDeviceInfo,
  SerialPortRequest,
} from "app-serialport/models"
import { SerialPortDevice, SerialPortDeviceStatus } from "./serial-port-device"
import { usb } from "usb"
import { AppSerialportDeviceScanner } from "./app-serialport-device-scanner"
import EventEmitter from "events"
import { AppLogger } from "app-serialport/utils"

type DevicesChangeCallback = (data: SerialPortChangedDevices) => void

enum Events {
  DevicesChanged = "DevicesChanged",
}

const DEVICE_CHANGE_DEBOUNCE_TIME = 1_000
const RESCAN_BASE_DELAY = 1_500
const RESCAN_MAX_DELAY = 30_000

export class AppSerialPortService {
  private eventEmitter = new EventEmitter()
  private devices = new Map<SerialPortDeviceId, SerialPortDevice>()

  private devicesChangedTimeout?: NodeJS.Timeout
  private rescanTimeout?: NodeJS.Timeout
  private rescanAttempts = 0
  private initialScan = true

  constructor() {
    this.triggerAttachScan()

    usb.on("attach", () => {
      this.initialScan = false
      // A physical change means the previous failures are no longer relevant.
      this.rescanAttempts = 0
      this.triggerAttachScan()
    })
  }

  private triggerAttachScan() {
    void this.handleAttach().catch((error) => {
      AppLogger.log(
        "error",
        `Error while scanning for serial devices: ${
          error instanceof Error ? error.message : String(error)
        }`
      )
    })
  }

  private debounceDevicesChanged() {
    return new Promise<void>((resolve) => {
      if (this.devicesChangedTimeout) {
        clearTimeout(this.devicesChangedTimeout)
      }
      this.devicesChangedTimeout = setTimeout(() => {
        this.eventEmitter.emit(Events.DevicesChanged)
        resolve()
      }, DEVICE_CHANGE_DEBOUNCE_TIME)
    })
  }

  /**
   * Schedules a rescan of the connected serial devices. Without this a device that
   * is dropped by the main process while it is still physically plugged in - a
   * freeze that timed out, a port error - would stay gone until the user replugs
   * the cable, because `usb.on("attach")` is the only other scan trigger.
   *
   * Repeated failures back off exponentially so a device that cannot be opened at
   * all does not turn into a rescan loop (on Windows a scan spawns PowerShell).
   */
  private scheduleRescan(reason: string) {
    clearTimeout(this.rescanTimeout)

    const delay = Math.min(
      RESCAN_BASE_DELAY * 2 ** this.rescanAttempts,
      RESCAN_MAX_DELAY
    )
    this.rescanAttempts++

    AppLogger.log(
      "warn",
      `Scheduling serial devices rescan in ${delay}ms. Reason: ${reason}.`
    )

    this.rescanTimeout = setTimeout(() => {
      this.triggerAttachScan()
    }, delay)
  }

  private initializeDevice(deviceInfo: SerialPortDeviceInfo): void {
    const device = new SerialPortDevice(deviceInfo, {
      onConnect: () => {
        AppLogger.log(
          "debug",
          `Device connected at path ${deviceInfo.path} (id: ${deviceInfo.id}).`
        )
        this.rescanAttempts = 0
        void this.debounceDevicesChanged()
      },
      onDisconnect: () => {
        AppLogger.log(
          "debug",
          `Device disconnected at path ${deviceInfo.path} (id: ${deviceInfo.id}).`
        )
        void this.debounceDevicesChanged()
        this.scheduleRescan(
          `device disconnected at path ${deviceInfo.path} (id: ${deviceInfo.id})`
        )
      },
      onOpenRetriesExhausted: (error) => {
        AppLogger.log(
          "warn",
          `Open retries exhausted for device at path ${deviceInfo.path} (id: ${deviceInfo.id}). Last error: ${error.message}`
        )
        this.scheduleRescan(
          `open retries exhausted at path ${deviceInfo.path}: ${error.message}`
        )
      },
    })

    device.attachPort(deviceInfo)

    this.devices.set(deviceInfo.id, device)
  }

  private async handleAttach(): Promise<void> {
    AppLogger.log(
      "silly",
      "Handling USB attach event. Scanning for serial port devices..."
    )
    const connectedDevices = await AppSerialportDeviceScanner.scan()

    for (const deviceInfo of connectedDevices) {
      const existingDevice = this.devices.get(deviceInfo.id)

      if (!existingDevice) {
        AppLogger.log(
          "silly",
          `New device detected at path ${deviceInfo.path} (id: ${deviceInfo.id}). Initializing...`
        )
        this.initializeDevice(deviceInfo)
      } else if (
        existingDevice.isFrozen() ||
        existingDevice.status === SerialPortDeviceStatus.DeviceDisconnected
      ) {
        AppLogger.log(
          "debug",
          `Device already exists at path ${deviceInfo.path} (id: ${deviceInfo.id}). Reinitializing...`
        )
        if (existingDevice.isFrozen()) {
          existingDevice.unfreeze()
        }
        existingDevice.attachPort(deviceInfo)
      }
    }
  }

  getCurrentDevices(): SerialPortDevice[] {
    return Array.from(this.devices.values()).map((device) => device)
  }

  private activateNewDevices() {
    const devices = this.getCurrentDevices().filter((device) => {
      return device.status === SerialPortDeviceStatus.DeviceConnected
    })

    for (const addedDevice of devices) {
      addedDevice.activate()
    }

    return devices
  }

  private cleanupRemovedDevices() {
    const removedDevices = this.getCurrentDevices().filter((device) => {
      return device.status === SerialPortDeviceStatus.DeviceDisconnected
    })

    for (const removedDevice of removedDevices) {
      removedDevice.destroy()
      this.devices.delete(removedDevice.info.id)
    }

    return removedDevices
  }

  onDevicesChanged(callback: DevicesChangeCallback): void {
    this.eventEmitter.on(Events.DevicesChanged, () => {
      const added = this.activateNewDevices()
      const removed = this.cleanupRemovedDevices()

      const all = this.getCurrentDevices().filter((device) => {
        return [
          SerialPortDeviceStatus.DeviceActive,
          SerialPortDeviceStatus.DeviceFrozen,
        ].includes(device.status)
      })

      const data: SerialPortChangedDevices = {
        all: all.map((device) => device.info),
        added: this.initialScan ? [] : added.map((device) => device.info),
        removed: removed.map((device) => device.info),
      }

      AppLogger.log(
        "debug",
        `Devices changed. Emitting updated device list to listeners: ${JSON.stringify(data, null, 2)}`,
        {
          doNotTrim: true,
        }
      )
      callback(data)
    })
  }

  request(deviceId: SerialPortDeviceId, request: SerialPortRequest) {
    const device = this.devices.get(deviceId)
    if (!device) {
      return Promise.reject(new Error(`Device not found at id ${deviceId}.`))
    }
    return device.request(request)
  }

  async reset(deviceId?: SerialPortDeviceId, rescan = true): Promise<void> {
    clearTimeout(this.rescanTimeout)
    this.rescanAttempts = 0

    if (deviceId) {
      const device = this.devices.get(deviceId)
      if (!device) {
        AppLogger.log(
          "warn",
          `Device not found at id ${deviceId}. Cannot reset device.`
        )
        return
      }
      device.destroy()
    } else {
      for (const device of this.devices.values()) {
        device.destroy()
      }
    }

    this.initialScan = true
    if (rescan) {
      await this.debounceDevicesChanged()
      await this.handleAttach()
    }
  }

  freeze(deviceId: SerialPortDeviceId, duration?: number): void {
    const device = this.devices.get(deviceId)
    if (!device) {
      AppLogger.log(
        "warn",
        `Device not found at id ${deviceId}. Cannot freeze device.`
      )
      return
    }
    device.prepareToFreeze(duration)
  }

  unfreeze(deviceId: SerialPortDeviceId): void {
    const device = this.devices.get(deviceId)
    if (!device) {
      AppLogger.log(
        "warn",
        `Device not found at id ${deviceId}. Cannot unfreeze device.`
      )
      return
    }
    device.unfreeze()
  }

  isFrozen(deviceId: SerialPortDeviceId): boolean {
    const device = this.devices.get(deviceId)
    if (!device) {
      return false
    }
    return device.isFrozen()
  }
}
