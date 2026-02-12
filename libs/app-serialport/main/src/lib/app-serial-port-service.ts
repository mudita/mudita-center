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
import { delay } from "app-utils/common"

type DevicesChangeCallback = (data: SerialPortChangedDevices) => void

enum Events {
  DevicesChanged = "DevicesChanged",
}

const DEVICE_CHANGE_DEBOUNCE_TIME = 1_000

export class AppSerialPortService {
  private eventEmitter = new EventEmitter()
  private devices = new Map<SerialPortDeviceId, SerialPortDevice>()

  private initPromise?: Promise<void>
  private devicesChangedTimeout?: NodeJS.Timeout
  private initialScan = true

  constructor() {
    void this.init().catch((error) => {
      AppLogger.log(
        "error",
        `Failed to initialize AppSerialPortService: ${error instanceof Error ? error.message : String(error)}`
      )
    })
  }

  public async init(): Promise<void> {
    if (this.initPromise) {
      return this.initPromise
    }

    this.initPromise = (async () => {
      await this.handleAttach()

      usb.on("attach", () => {
        this.initialScan = false
        this.handleAttach()
      })
      usb.on("detach", () => {
        this.handleDetach()
      })
    })()

    return this.initPromise
  }

  private debounceDevicesChanged() {
    if (this.devicesChangedTimeout) {
      clearTimeout(this.devicesChangedTimeout)
    }
    this.devicesChangedTimeout = setTimeout(() => {
      this.eventEmitter.emit(Events.DevicesChanged)
    }, DEVICE_CHANGE_DEBOUNCE_TIME)
  }

  private initializeDevice(deviceInfo: SerialPortDeviceInfo): void {
    const device = new SerialPortDevice(deviceInfo, {
      onConnect: () => {
        AppLogger.log(
          "debug",
          `Device connected at path ${deviceInfo.path} (id: ${deviceInfo.id}).`
        )
        this.debounceDevicesChanged()
      },
      onDisconnect: () => {
        AppLogger.log(
          "debug",
          `Device disconnected at path ${deviceInfo.path} (id: ${deviceInfo.id}).`
        )
        this.debounceDevicesChanged()
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
      } else {
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

  // Method only for detecting detach of non-serialport devices
  private async handleDetach(): Promise<void> {
    AppLogger.log("silly", "Handling USB detach event.")

    await delay(500)

    const connectedDevices = await AppSerialportDeviceScanner.scan()
    let devicesRemoved = false

    for (const device of this.devices.values()) {
      const notConnectedAnymore = !connectedDevices.some(
        (connectedDevice) => connectedDevice.id === device.info.id
      )
      const isNonSerialPortDevice = device.isNonSerialPort()

      if (notConnectedAnymore && isNonSerialPortDevice) {
        AppLogger.log(
          "debug",
          `Device at path ${device.info.path} (id: ${device.info.id}) is no longer connected. Destroying device instance...`
        )
        device.destroy()
        devicesRemoved = true
      }
    }

    if (devicesRemoved) {
      this.debounceDevicesChanged()
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

  async reset(
    deviceId?: SerialPortDeviceId,
    options?: { rescan?: boolean }
  ): Promise<void> {
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
      this.devices.delete(deviceId)
    } else {
      for (const device of this.devices.values()) {
        device.destroy()
      }
      this.devices.clear()
    }

    this.initialScan = true
    await this.handleAttach()
    if (options?.rescan) {
      this.debounceDevicesChanged()
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
