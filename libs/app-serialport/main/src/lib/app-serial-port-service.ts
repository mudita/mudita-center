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
import logger from "electron-log/main"
import { AppSerialportDeviceScanner } from "./app-serialport-device-scanner"
import EventEmitter from "events"

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
      logger.error("Failed to initialize AppSerialPortService:", error)
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
        logger.debug(
          `Device connected at path ${deviceInfo.path} (id: ${deviceInfo.id}).`
        )
        this.debounceDevicesChanged()
      },
      onDisconnect: () => {
        logger.debug(
          `Device disconnected at path ${deviceInfo.path} (id: ${deviceInfo.id}).`
        )
        this.debounceDevicesChanged()
      },
    })

    device.initialize()

    this.devices.set(deviceInfo.id, device)
  }

  private async handleAttach(): Promise<void> {
    logger.silly(
      "Handling USB attach event. Scanning for serial port devices..."
    )
    const connectedDevices = await AppSerialportDeviceScanner.scan()

    for (const deviceInfo of connectedDevices) {
      const existingDevice = this.devices.get(deviceInfo.id)

      if (!existingDevice) {
        logger.silly(
          `New device detected at path ${deviceInfo.path} (id: ${deviceInfo.id}). Initializing...`
        )
        this.initializeDevice(deviceInfo)
      } else {
        logger.silly(
          `Device already exists at path ${deviceInfo.path} (id: ${deviceInfo.id}). Reinitializing...`
        )
        if (existingDevice.info.path !== deviceInfo.path) {
          logger.warn(
            `Device path changed after reconnecting for device id ${deviceInfo.id}. Before: ${existingDevice.info.path}, after: ${deviceInfo.path}. Reinitializing device with new path.`
          )
          this.initializeDevice(deviceInfo)
        } else {
          existingDevice.unfreeze()
        }
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

  private async cleanupRemovedDevices() {
    const removedDevices = this.getCurrentDevices().filter((device) => {
      return device.status === SerialPortDeviceStatus.DeviceDisconnected
    })

    console.log({ removedDevices })

    for (const removedDevice of removedDevices) {
      await removedDevice.destroy()
      this.devices.delete(removedDevice.info.id)
    }

    return removedDevices
  }

  onDevicesChanged(callback: DevicesChangeCallback): void {
    this.eventEmitter.on(Events.DevicesChanged, async () => {
      const added = this.activateNewDevices()
      const removed = await this.cleanupRemovedDevices()

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

      logger.silly(
        "Devices changed. Emitting updated device list to listeners:",
        data
      )
      callback(data)
    })
  }

  changeBaudRate(deviceId: SerialPortDeviceId, baudRate: number): void {
    const device = this.devices.get(deviceId)
    if (!device) {
      logger.error(
        `Device not found at id ${deviceId}. Cannot change baud rate.`
      )
      return
    }
    device.changeBaudRate(baudRate)
  }

  request(deviceId: SerialPortDeviceId, request: SerialPortRequest) {
    const device = this.devices.get(deviceId)
    if (!device) {
      return Promise.reject(new Error(`Device not found at id ${deviceId}.`))
    }
    return device.request(request)
  }

  reset(deviceId?: SerialPortDeviceId, options?: { rescan?: boolean }): void {
    //
  }

  freeze(deviceId: SerialPortDeviceId, duration?: number): void {
    const device = this.devices.get(deviceId)
    if (!device) {
      logger.error(`Device not found at id ${deviceId}. Cannot freeze device.`)
      return
    }
    device.prepareToFreeze(duration)
  }

  unfreeze(deviceId: SerialPortDeviceId): void {
    const device = this.devices.get(deviceId)
    if (!device) {
      logger.error(
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
