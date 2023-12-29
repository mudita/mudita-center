/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import SerialPort, { PortInfo as SerialPortInfo } from "serialport"
import { MainProcessIpc } from "electron-better-ipc"
import { Mutex } from "async-mutex"
import { EventEmitter } from "events"
import { DeviceResolverService } from "Core/device-manager/services/device-resolver.service"
import { AppError } from "Core/core/errors"
import { Result, ResultObject } from "Core/core/builder"
import { Device } from "Core/device/modules/device"
import { PortInfo } from "Core/device-manager/types"
import { PortInfoValidator } from "Core/device-manager/validators"
import {
  DeviceManagerError,
  DeviceManagerMainEvent,
} from "Core/device-manager/constants"
import logger from "Core/__deprecated__/main/utils/logger"
import { DeviceId } from "Core/device/constants/device-id"
import { log } from "Core/core/decorators/log.decorator"

export class DeviceManager {
  public activeDevice: Device | undefined
  public devicesMap = new Map<string, Device>()

  private mutex = new Mutex()

  constructor(
    private deviceResolver: DeviceResolverService,
    private ipc: MainProcessIpc,
    protected eventEmitter: EventEmitter
  ) {}

  get device(): Device {
    if (!this.activeDevice) {
      throw new AppError(
        DeviceManagerError.NoActiveDevice,
        "Active device is undefined"
      )
    }

    return this.activeDevice
  }

  get devices(): Device[] {
    return Array.from(this.devicesMap.values())
  }

  public setActiveDevice(id: DeviceId | undefined): ResultObject<boolean> {
    if (id === undefined) {
      this.activeDevice = undefined

      return Result.success(true)
    }

    const newActiveDevice = this.devicesMap.get(id)

    if (!newActiveDevice) {
      return Result.failed(
        new AppError(
          DeviceManagerError.CannotFindDevice,
          `Device ${id} can't be found`
        )
      )
    }

    this.activeDevice = newActiveDevice

    return Result.success(true)
  }

  public async addDevice(port: PortInfo): Promise<void> {
    await this.mutex.runExclusive(async () => {
      await this.addDeviceTask(port)
    })
  }

  public removeDevice(path: string): void {
    const device = this.getDeviceByPath(path)

    if (device === undefined) {
      return
    }

    this.devicesMap.delete(device.id)

    if (this.activeDevice?.id === device.id) {
      this.activeDevice = undefined
    }

    const data = device.toSerializableObject()

    this.ipc.sendToRenderers(DeviceManagerMainEvent.DeviceDetached, data)
    logger.info(`Detached device with path: ${path}`)
  }

  public async getAttachedDevices(): Promise<SerialPortInfo[]> {
    const portList = await this.getSerialPortList()
    return (
      portList
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/unbound-method
        .filter(PortInfoValidator.isPortInfoMatch)
    )
  }

  private async addDeviceTask(port: PortInfo): Promise<void> {
    const device = await this.initializeDevice(port)

    const alreadyInitializedDevices = this.getDevicePaths()
    if (alreadyInitializedDevices.includes(port.path ?? "")) {
      return
    }

    if (!device) {
      return
    }

    this.devicesMap.set(device.id, device)
    const result = await device.connect()
    const data = device.toSerializableObject()

    if (result.ok) {
      this.ipc.sendToRenderers(DeviceManagerMainEvent.DeviceConnected, data)
    } else {
      this.ipc.sendToRenderers(DeviceManagerMainEvent.DeviceConnectFailed, data)
    }
  }

  private async initializeDevice(
    portInfo: PortInfo
  ): Promise<Device | undefined> {
    const sleep = () => new Promise((resolve) => setTimeout(resolve, 500))
    const retryLimit = 20

    portInfo.productId = portInfo.productId?.toUpperCase()
    portInfo.vendorId = portInfo.vendorId?.toUpperCase()

    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-async-promise-executor
    return new Promise<Device | undefined>(async (resolve) => {
      for (let i = 0; i < retryLimit; i++) {
        const portList = await this.getAttachedDevices()
        const port = portList.find(
          ({ productId, vendorId, path }) =>
            productId?.toUpperCase() === portInfo.productId &&
            vendorId?.toUpperCase() === portInfo.vendorId &&
            path === portInfo.path
        )

        if (port) {
          const device = this.deviceResolver.resolve(port)
          return resolve(device)
        } else {
          await sleep()
        }
      }

      resolve(undefined)
    })
  }

  @log("==== device manager: list ====")
  private getSerialPortList(): Promise<SerialPortInfo[]> {
    return SerialPort.list()
  }

  private getDeviceByPath(path: string): Device | undefined {
    return this.devices.find((device) => device.path === path)
  }

  private getDevicePaths(): string[] {
    return this.devices.map(({ path }) => path)
  }
}
