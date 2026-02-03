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
import { SerialPortDevice } from "app-serialport/devices"
import EventEmitter from "events"
import { usb } from "usb"
import { AppSerialportDeviceScanner } from "./app-serialport-device-scanner"
import logger from "electron-log/main"
import { SerialPortError } from "app-serialport/utils"

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
    SerialPortDeviceId,
    {
      info: SerialPortDeviceInfo
      instance?: SerialPortDevice
      freezer: {
        duration?: number
        timeout?: NodeJS.Timeout
      }
      reconnecting?: Promise<void>
    }
  >()
  private initPromise?: Promise<void>

  constructor() {
    void this.init()
  }

  public async init() {
    if (this.initPromise) {
      return this.initPromise
    }

    this.initPromise = (async () => {
      usb.on("attach", () => void this.detectChanges())
      usb.on("detach", () => void this.detectChanges())
      await this.detectChanges({ initial: true })
    })()

    return this.initPromise
  }

  public async detectChanges({ initial }: { initial?: boolean } = {}) {
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

      const existingDevice = this.devices.get(device.id)
      if (!existingDevice) {
        const newInstance = new instance({
          path: device.path,
        }) as SerialPortDevice
        this.devices.set(device.id, {
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
          existingDevice.info.id
        )
      }
    }

    // Detect removed devices
    for (const device of this.devices.values()) {
      if (!connectedDevices.find(({ id }) => id === device.info.id)) {
        await device?.instance?.destroyAsync()

        if (device?.freezer.duration) {
          device.freezer.timeout = setTimeout(() => {
            this.eventEmitter.emit(
              SerialPortEvents.FrozenDeviceExpired,
              device.info.id
            )
            this.unfreeze(device.info.id)
          }, device.freezer.duration)

          continue
        }

        this.devices.delete(device.info.id)
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

  changeBaudRate(id: SerialPortDeviceId, baudRate: number) {
    const device = this.devices.get(id)
    if (!device) {
      logger.warn(`Cannot change baud rate. Device not found at id ${id}.`)
      return
    }
    if (!device.instance) {
      logger.warn(
        `Cannot change baud rate. Device instance not found at id ${id}.`
      )
      return
    }
    return device.instance.update({ baudRate })
  }

  async request(
    id: SerialPortDeviceId,
    data: SerialPortRequest
  ): ReturnType<SerialPortDevice["request"]> {
    try {
      const device = this.devices.get(id)
      if (!device) {
        logger.warn(`Cannot send request. Device not found at id ${id}.`)
        throw new Error(`Device not found at id ${id}.`)
      }

      if (device.reconnecting) {
        await device.reconnecting
      }

      if (device.freezer.timeout) {
        return new Promise((resolve, reject) => {
          const onExpire = (id: SerialPortDeviceId) => {
            if (id === device.info.id) {
              this.eventEmitter.removeListener(
                SerialPortEvents.FrozenDeviceExpired,
                onExpire
              )
              this.eventEmitter.removeListener(
                SerialPortEvents.FrozenDeviceReconnected,
                onReconnect
              )
              logger.warn(`Request to frozen device at id ${id} expired.`)
              reject(new Error(`Device at id ${id} is frozen.`))
            }
          }
          this.eventEmitter.on(SerialPortEvents.FrozenDeviceExpired, onExpire)

          const onReconnect = (id: SerialPortDeviceId) => {
            if (id === device.info.id) {
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
                  `Request to device at id ${id} failed after reconnection.`
                )
                reject(new Error(`Device at id ${id} is not connected.`))
              }
            }
          }
          this.eventEmitter.on(
            SerialPortEvents.FrozenDeviceReconnected,
            onReconnect
          )
        })
      }

      if (!device.instance) {
        logger.warn(
          `Cannot send request. Device instance not found at id ${id}.`
        )
        throw new Error(`Device at id ${id} is not connected.`)
      }
      return await device.instance.request(data)
    } catch (error) {
      if (error instanceof SerialPortError) {
        const device = this.devices.get(id)

        if (!device) {
          logger.warn(`Cannot reconnect. Device not found at id ${id}.`)
          throw error
        }

        if (!device.reconnecting) {
          device.reconnecting = this.reconnect(id)
            .then(() => {
              device.reconnecting = undefined
            })
            .catch((reconnectError) => {
              device.reconnecting = undefined
              logger.error(
                `Failed to reconnect device at id ${id}:`,
                reconnectError
              )
            })
        }
        await device.reconnecting

        if (device?.instance) {
          return device.instance.request(data)
        }
      }
      throw error
    }
  }

  private async reconnect(id: SerialPortDeviceId) {
    logger.info(`Reconnecting device ${id}...`)

    const device = this.devices.get(id)
    if (!device) {
      logger.warn(`Cannot reconnect. Device not found at id ${id}.`)
      return
    }

    if (device.instance) {
      await device.instance.destroyAsync()
      device.instance = undefined
    }

    const connectedDevices = await AppSerialportDeviceScanner.scan()
    const scannedDevice = connectedDevices.find((d) => d.id === id)

    if (scannedDevice) {
      const instance =
        AppSerialportDeviceScanner.getMatchingInstance(scannedDevice)

      if (instance) {
        device.instance = new instance({
          path: scannedDevice.path,
        }) as SerialPortDevice

        logger.info(`Device ${id} reconnected successfully`)
      }
    }
  }

  freeze(id: SerialPortDeviceId, duration = DEFAULT_FREEZE_DURATION) {
    const device = this.devices.get(id)
    if (!device) {
      logger.warn(`Cannot freeze. Device not found at id ${id}.`)
      return
    }
    if (device.freezer.timeout) {
      logger.warn(`Device at id ${id} is already frozen.`)
      return
    }
    device.freezer.duration = duration
  }

  unfreeze(id: SerialPortDeviceId) {
    const device = this.devices.get(id)
    if (!device) {
      logger.warn(`Cannot unfreeze. Device not found at id ${id}.`)
      return
    }
    clearTimeout(device.freezer.timeout)
    device.freezer = {}
    void this.detectChanges()
  }

  isFrozen(id: SerialPortDeviceId) {
    const device = this.devices.get(id)
    return !!device?.freezer.timeout
  }

  async reset(id?: SerialPortDeviceId, { rescan = true } = {}) {
    if (id) {
      const device = this.devices.get(id)
      if (device) {
        await device?.instance?.destroyAsync()
        this.devices.delete(id)
      }
    } else {
      for (const device of this.devices.values()) {
        await device?.instance?.destroyAsync()
      }
      this.devices.clear()
    }

    if (rescan) {
      void this.detectChanges()
    }
  }
}
