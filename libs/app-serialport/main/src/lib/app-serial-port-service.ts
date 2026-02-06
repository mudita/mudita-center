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
import logger from "electron-log/main"
import { AppSerialportDeviceScanner } from "./app-serialport-device-scanner"
import { DeviceFreezeHandler } from "./helpers/device-freeze-handler"
import { uniqBy } from "lodash"
import { delay } from "app-utils/common"

type DevicesChangeCallback = (data: SerialPortChangedDevices) => void

enum SerialPortEvents {
  DevicesUpdated = "devicesUpdated",
}

enum RequestRetryState {
  Retry,
  WaitForUnpause,
  CheckIfFreezable,
  ReinitializeInstance,
  RetryLastTime,
}

interface DeviceEntry {
  info: SerialPortDeviceInfo
  instance?: SerialPortDevice
  freezeHandler: DeviceFreezeHandler
  requestsPaused: boolean
}

export class AppSerialPortService {
  private readonly eventEmitter = new EventEmitter()
  private readonly devices = new Map<SerialPortDeviceId, DeviceEntry>()
  private initPromise?: Promise<void>
  private changedDevices: SerialPortChangedDevices = {
    added: [],
    removed: [],
    all: [],
  }

  constructor() {
    void this.init().catch((error) => {
      logger.error("Failed to initialize AppSerialPortService:", error)
    })
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

  private initializeDevice(deviceInfo: SerialPortDeviceInfo) {
    const instance = AppSerialportDeviceScanner.getMatchingInstance(deviceInfo)
    if (!instance) {
      return
    }

    const freezeHandler = new DeviceFreezeHandler()

    freezeHandler.on("freeze", async () => {
      const device = this.devices.get(deviceInfo.id)
      if (device) {
        device.requestsPaused = true
      }
    })

    freezeHandler.on("unfreeze", async (reason) => {
      // If device was unfrozen due to timeout, consider it as removed
      if (reason === "timeout") {
        await this.destroyDevice(deviceInfo.id)
        this.changedDevices.removed.push(deviceInfo)
      }

      await this.detectChanges()
    })

    this.devices.set(deviceInfo.id, {
      info: deviceInfo,
      instance: new instance({ path: deviceInfo.path }) as SerialPortDevice,
      freezeHandler,
      requestsPaused: false,
    })
  }

  private async destroyDevice(id: SerialPortDeviceId) {
    const device = this.devices.get(id)
    if (!device) {
      logger.warn(`Cannot destroy device. Device not found at id ${id}.`)
      return
    }
    try {
      device.freezeHandler.off()
      await device.instance?.destroyAsync()
    } finally {
      this.devices.delete(id)
    }
  }

  private async detectAddedDevices(connectedDevices: SerialPortDeviceInfo[]) {
    for (const connectedDevice of connectedDevices) {
      const isNewDevice = !this.devices.has(connectedDevice.id)

      // New device detected
      if (isNewDevice) {
        this.initializeDevice(connectedDevice)
        this.changedDevices.added.push(connectedDevice)
        continue
      }

      // Existing device reconnected
      const existingDevice = this.devices.get(connectedDevice.id) as DeviceEntry
      const instance =
        AppSerialportDeviceScanner.getMatchingInstance(connectedDevice)

      if (!instance) {
        continue
      }

      // Update device info in case it changed
      existingDevice.info = connectedDevice

      if (existingDevice.freezeHandler.isFrozen) {
        existingDevice.freezeHandler.unfreeze()
      }

      // Reinitialize serialport instance
      await this.reinitializeInstance(connectedDevice.id)
    }
  }

  private async detectRemovedDevices(connectedDevices: SerialPortDeviceInfo[]) {
    const existingDevices = Array.from(this.devices.values())

    for (const deviceInfo of existingDevices) {
      const isConnected = connectedDevices.some(
        (d) => d.id === deviceInfo.info.id
      )
      if (isConnected) {
        continue
      }

      if (deviceInfo.freezeHandler.isFrozen) {
        // If device is frozen, keep it in the list
        continue
      }

      if (deviceInfo.freezeHandler.shouldFreeze) {
        // Freeze device instead of removing
        deviceInfo.freezeHandler.freeze()
        continue
      }

      // Otherwise, remove the device permanently
      await this.destroyDevice(deviceInfo.info.id)
      this.changedDevices.removed.push(deviceInfo.info)
    }
  }

  async detectChanges({ initial }: { initial?: boolean } = {}) {
    const connectedDevices = await AppSerialportDeviceScanner.scan()

    await this.detectAddedDevices(connectedDevices)
    await this.detectRemovedDevices(connectedDevices)
    const all = this.getCurrentDevices()

    const changedDevices: SerialPortChangedDevices = {
      added: uniqBy(this.changedDevices.added, "id"),
      removed: uniqBy(this.changedDevices.removed, "id"),
      all,
    }

    if (
      changedDevices.added.length > 0 ||
      changedDevices.removed.length > 0 ||
      initial
    ) {
      console.log({ changedDevices })
      this.eventEmitter.emit(SerialPortEvents.DevicesUpdated, changedDevices)
    }
    this.changedDevices = { added: [], removed: [], all }
  }

  getCurrentDevices() {
    return Array.from(this.devices.values()).map(({ info, freezeHandler }) => ({
      ...info,
      frozen: freezeHandler.isFrozen,
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
    device.instance.update({ baudRate })
  }

  async request(
    id: SerialPortDeviceId,
    data: SerialPortRequest,
    retryState?: RequestRetryState
  ): ReturnType<SerialPortDevice["request"]> {
    const device = this.devices.get(id)
    if (!device) {
      throw new Error(`Device not found at id ${id}.`)
    }
    if (!device.instance) {
      throw new Error(`Device instance not found at id ${id}.`)
    }

    try {
      switch (retryState) {
        case RequestRetryState.WaitForUnpause:
          await this.waitForUnpause(id)
          break
        case RequestRetryState.CheckIfFreezable:
          if (device.freezeHandler.shouldFreeze) {
            device.freezeHandler.freeze()
            await this.waitForUnpause(id)
          }
          break
        case RequestRetryState.ReinitializeInstance:
          await this.reinitializeInstance(id)
          break
        case RequestRetryState.Retry:
        case RequestRetryState.RetryLastTime:
        default:
          break
      }

      return await device.instance.request(data)
    } catch (error) {
      switch (retryState) {
        case undefined:
          logger.warn(`Request failed for device at id ${id}. Retrying...`)
          return this.request(id, data, RequestRetryState.Retry)
        case RequestRetryState.Retry:
          logger.warn(
            `Request failed for device at id ${id}. Retrying after unpause...`
          )
          return this.request(id, data, RequestRetryState.WaitForUnpause)
        case RequestRetryState.WaitForUnpause:
          logger.warn(
            `Request failed for device at id ${id} after unpause. Checking if freezable and retrying...`
          )
          return this.request(id, data, RequestRetryState.CheckIfFreezable)
        case RequestRetryState.CheckIfFreezable:
          logger.warn(
            `Request failed for device at id ${id} after freeze check. Retrying after reinitialization...`
          )
          return this.request(id, data, RequestRetryState.ReinitializeInstance)
        case RequestRetryState.ReinitializeInstance:
          logger.warn(
            `Request failed for device at id ${id} after reinitialization. One last retry.`
          )
          return this.request(id, data, RequestRetryState.RetryLastTime)
        case RequestRetryState.RetryLastTime:
          logger.warn(
            `Request failed for device at id ${id} after all retries. Giving up.`
          )
          break
      }

      throw error
    }
  }

  private async waitForUnpause(id: SerialPortDeviceId): Promise<void> {
    let device = this.devices.get(id)

    while (device && device.requestsPaused) {
      console.log("Device requests are paused, waiting...")
      await delay(500)
      device = this.devices.get(id)
    }
  }

  private async reinitializeInstance(id: SerialPortDeviceId) {
    const device = this.devices.get(id)
    if (!device) {
      return
    }
    const currentDevices = this.getCurrentDevices()
    const isDeviceConnected = currentDevices.some((d) => d.id === id)
    if (!isDeviceConnected) {
      return
    }

    const instance = AppSerialportDeviceScanner.getMatchingInstance(device.info)
    if (!instance) {
      return
    }

    try {
      device.requestsPaused = true

      if (device.instance) {
        await device.instance.destroyAsync()
        device.instance = undefined
      }

      device.instance = new instance({
        path: device.info.path,
      }) as SerialPortDevice

      await device.instance.waitForOpen()
    } catch (error) {
      logger.error(`Error reinitializing device instance at id ${id}:`, error)
    } finally {
      device.requestsPaused = false
    }
  }

  isFrozen(id: SerialPortDeviceId) {
    const device = this.devices.get(id)
    return device?.freezeHandler.isFrozen
  }

  freeze(id: SerialPortDeviceId, duration?: number) {
    const device = this.devices.get(id)
    if (!device) {
      return
    }
    device.freezeHandler.prepareToFreeze(duration)
  }

  unfreeze(id: SerialPortDeviceId) {
    const device = this.devices.get(id)
    if (!device) {
      return
    }
    device.freezeHandler.unfreeze()
  }

  async reset(id?: SerialPortDeviceId, { rescan = true } = {}) {
    if (id) {
      const device = this.devices.get(id)
      if (device) {
        await this.destroyDevice(id)
      }
    } else {
      for (const device of this.devices.values()) {
        await this.destroyDevice(device.info.id)
      }
      this.devices.clear()
    }

    if (rescan) {
      void this.detectChanges()
    }
  }
}
