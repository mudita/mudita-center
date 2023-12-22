/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import SerialPort, { PortInfo as SerialPortInfo } from "serialport"
import { MainProcessIpc } from "electron-better-ipc"
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
import { EventEmitter } from "events"
import logger from "Core/__deprecated__/main/utils/logger"
import { Mutex } from "async-mutex"
import { DeviceId } from "Core/device/constants/device-id"

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

  public setActiveDevice(id: DeviceId): ResultObject<boolean> {
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

  // TODO: `addDevice` method to hides
  public async addDevice(port: PortInfo): Promise<void> {
    await this.mutex.runExclusive(async () => {
      await this.addDeviceTask(port)
    })
  }

  // TODO: `removeDevice` method to hides
  public removeDevice(path: string): void {
    const device = this.getDeviceByPath(path)
    if (device === undefined) {
      //TODO: handle device as undefined
      return
    }

    this.activeDevice = undefined

    this.ipc.sendToRenderers(DeviceManagerMainEvent.DeviceDetached, device.id)
    logger.info(`Detached device with path: ${path}`)
  }

  // TODO: `getAttachedDevices` method to hides
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
    if (!device) {
      // TODO: handle not possible use case
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

    const alreadyInitializedDevices = this.getDevicePaths()

    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-async-promise-executor
    return new Promise<Device | undefined>(async (resolve) => {
      for (let i = 0; i < retryLimit; i++) {
        const portList = await this.getAttachedDevices()
        const port = portList.find(
          ({ productId, vendorId, path }) =>
            productId?.toUpperCase() === portInfo.productId &&
            vendorId?.toUpperCase() === portInfo.vendorId &&
            ((!portInfo.path && !alreadyInitializedDevices.includes(path)) ||
              path === portInfo.path)
        )

        if (port) {
          const device = this.deviceResolver.resolve(port)

          // TODO: simplify resolve logic
          if (!device) {
            return
          }

          return resolve(device)
        }
        await sleep()
      }

      resolve(undefined)
    })
  }

  // TODO: uncomment bellow logger
  // @log("==== device manager: list ====")
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
