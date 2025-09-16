/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  SerialPortChangedDevices,
  SerialPortDeviceInfo,
  SerialPortDevicePath,
  SerialPortRequest,
} from "app-serialport/models"
import { SerialPortDevice } from "app-serialport/devices"
import EventEmitter from "events"
import { usb } from "usb"
import { AppSerialportDeviceScanner } from "./app-serialport-device-scanner"
import logger from "electron-log/main"

type DevicesChangeCallback = (data: SerialPortChangedDevices) => void
enum SerialPortEvents {
  DevicesUpdated = "devicesUpdated",
  FrozenDeviceReconnected = "frozenDeviceReconnected",
  FrozenDeviceExpired = "frozenDeviceExpired",
}

const DEFAULT_FREEZE_DURATION = 60_000 // 1 minute

export class AppSerialPortService {
  private readonly eventEmitter = new EventEmitter()
  private readonly devices = new Map<
    SerialPortDevicePath,
    {
      info: SerialPortDeviceInfo
      instance?: SerialPortDevice
      freezer: {
        duration?: number
        timeout?: NodeJS.Timeout
      }
    }
  >()

  constructor() {
    this.init()
  }

  private init() {
    void this.detectChanges({ initial: true })

    usb.on("attach", () => {
      void this.detectChanges()
    })

    usb.on("detach", () => {
      void this.detectChanges()
    })
  }

  private async detectChanges({ initial }: { initial?: boolean } = {}) {
    const connectedDevices = await AppSerialportDeviceScanner.scan()

    const changedDevices: SerialPortChangedDevices = {
      all: [],
      added: [],
      removed: [],
    }

    // Detect added devices
    for (const device of connectedDevices) {
      const instance = AppSerialportDeviceScanner.getMatchingInstance(device)
      if (!instance) {
        continue
      }

      const existingDevice = this.devices.get(device.path)
      if (!existingDevice) {
        const newInstance = new instance({
          path: device.path,
        }) as SerialPortDevice
        this.devices.set(device.path, {
          info: device,
          instance: newInstance,
          freezer: {},
        })
        changedDevices.added.push(device)
      } else if (existingDevice.freezer.timeout) {
        const newInstance = new instance({
          path: device.path,
        }) as SerialPortDevice

        clearTimeout(existingDevice.freezer.timeout)
        existingDevice.freezer.timeout = undefined
        existingDevice.freezer.duration = undefined
        existingDevice.instance = newInstance

        this.eventEmitter.emit(
          SerialPortEvents.FrozenDeviceReconnected,
          existingDevice.info.path
        )
      }
    }

    // Detect removed devices
    for (const device of this.devices.values()) {
      if (!connectedDevices.find(({ path }) => path === device.info.path)) {
        device?.instance?.destroy()

        if (device?.freezer.duration) {
          device.freezer.timeout = setTimeout(() => {
            this.eventEmitter.emit(
              SerialPortEvents.FrozenDeviceExpired,
              device.info.path
            )
            this.unfreeze(device.info.path)
          }, device.freezer.duration)

          continue
        }

        this.devices.delete(device.info.path)
        changedDevices.removed.push(device.info)
      }
    }

    changedDevices.all = this.getCurrentDevices()

    if (
      changedDevices.added.length ||
      changedDevices.removed.length ||
      initial
    ) {
      this.eventEmitter.emit(SerialPortEvents.DevicesUpdated, changedDevices)
    }
  }

  getCurrentDevices() {
    return Array.from(this.devices.values()).map(({ info, freezer }) => ({
      ...info,
      frozen: !!freezer.timeout,
    }))
  }

  onDevicesChanged(callback: DevicesChangeCallback) {
    this.eventEmitter.on(SerialPortEvents.DevicesUpdated, callback)
  }

  changeBaudRate(path: SerialPortDevicePath, baudRate: number) {
    const device = this.devices.get(path)
    if (!device) {
      logger.warn(`Cannot change baud rate. Device not found at path ${path}.`)
      return
    }
    if (!device.instance) {
      logger.warn(
        `Cannot change baud rate. Device instance not found at path ${path}.`
      )
      return
    }
    return device.instance.update({ baudRate })
  }

  async request(
    path: SerialPortDevicePath,
    data: SerialPortRequest,
    retries = 1
  ): ReturnType<SerialPortDevice["request"]> {
    const device = this.devices.get(path)
    if (!device) {
      logger.warn(`Cannot send request. Device not found at path ${path}.`)
      throw new Error(`Device not found at path ${path}.`)
    }

    if (device.freezer.timeout) {
      return new Promise((resolve, reject) => {
        const onExpire = (path: SerialPortDevicePath) => {
          if (path === device.info.path) {
            this.eventEmitter.removeListener(
              SerialPortEvents.FrozenDeviceExpired,
              onExpire
            )
            this.eventEmitter.removeListener(
              SerialPortEvents.FrozenDeviceReconnected,
              onReconnect
            )
            logger.warn(`Request to frozen device at path ${path} expired.`)
            reject(new Error(`Device at path ${path} is frozen.`))
          }
        }
        this.eventEmitter.on(SerialPortEvents.FrozenDeviceExpired, onExpire)

        const onReconnect = (path: SerialPortDevicePath) => {
          if (path === device.info.path) {
            this.eventEmitter.removeListener(
              SerialPortEvents.FrozenDeviceExpired,
              onExpire
            )
            this.eventEmitter.removeListener(
              SerialPortEvents.FrozenDeviceReconnected,
              onReconnect
            )
            if (device.instance) {
              resolve(device.instance.request(data))
            } else {
              logger.warn(
                `Request to device at path ${path} failed after reconnection.`
              )
              reject(new Error(`Device at path ${path} is not connected.`))
            }
          }
        }
        this.eventEmitter.on(
          SerialPortEvents.FrozenDeviceReconnected,
          onReconnect
        )
      })
    }
    try {
      if (!device.instance) {
        logger.warn(
          `Cannot send request. Device instance not found at path ${path}.`
        )
        throw new Error(`Device at path ${path} is not connected.`)
      }
      return await device.instance.request(data)
    } catch (error) {
      if (retries > 0) {
        return this.request(path, data, retries - 1)
      }
      throw error
    }
  }

  freeze(path: SerialPortDevicePath, duration = DEFAULT_FREEZE_DURATION) {
    const device = this.devices.get(path)
    if (!device) {
      logger.warn(`Cannot freeze. Device not found at path ${path}.`)
      return
    }
    if (device.freezer.timeout) {
      logger.warn(`Device at path ${path} is already frozen.`)
      return
    }
    device.freezer.duration = duration
  }

  unfreeze(path: SerialPortDevicePath) {
    const device = this.devices.get(path)
    if (!device) {
      logger.warn(`Cannot unfreeze. Device not found at path ${path}.`)
      return
    }
    clearTimeout(device.freezer.timeout)
    device.freezer = {}
    void this.detectChanges()
  }

  isFrozen(path: SerialPortDevicePath) {
    const device = this.devices.get(path)
    return !!device?.freezer.timeout
  }
}
