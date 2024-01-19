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
import { PortInfo } from "Core/device-manager/types"
import { PortInfoValidator } from "Core/device-manager/validators"
import { DeviceManagerError } from "Core/device-manager/constants"
import { DeviceManagerMainEvent } from "shared/utils"
import logger from "Core/__deprecated__/main/utils/logger"
import { DeviceId } from "Core/device/constants/device-id"
import { log } from "Core/core/decorators/log.decorator"
import { APIDevice } from "device/feature"
import { BaseDevice } from "Core/device/modules/base-device"
import { CoreDevice } from "Core/device/modules/core-device"
import { RequestConfig } from "Core/device/types/mudita-os"
import { DeviceCommunicationError, DeviceType } from "Core/device"
import { MockCoreDevice } from "Core/device/modules/mock-core-device"
import { callRenderer } from "device/adapters"

export class DeviceManager {
  public activeDevice: BaseDevice | undefined
  public devicesMap = new Map<string, BaseDevice>()

  private mutex = new Mutex()

  constructor(
    private deviceResolver: DeviceResolverService,
    private ipc: MainProcessIpc,
    protected eventEmitter: EventEmitter
  ) {}

  get apiDevice() {
    if (
      !this.activeDevice ||
      this.activeDevice.deviceType !== DeviceType.APIDevice
    ) {
      return null
    }

    // TODO: add device type validation
    return this.activeDevice as APIDevice
  }

  get device(): CoreDevice {
    if (!this.activeDevice) {
      return new MockCoreDevice(
        {} as unknown as SerialPortInfo,
        "deviceType" as DeviceType
      ) as CoreDevice
    }

    // TODO: add device type validation
    return this.activeDevice as CoreDevice
  }

  public getAPIDeviceById(id: DeviceId) {
    const device = this.devicesMap.get(id)
    if (!device || device.deviceType !== DeviceType.APIDevice) {
      return null
    }
    return device as APIDevice
  }

  get devices(): BaseDevice[] {
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

  public request<ResponseType = unknown>(
    id: DeviceId,
    config: RequestConfig<unknown>
  ): Promise<ResultObject<ResponseType, DeviceCommunicationError>> {
    const device = this.devicesMap.get(id) as CoreDevice
    return device.request(config)
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

    console.log(result, data)

    if (result.ok) {
      callRenderer(DeviceManagerMainEvent.DeviceConnected, data)
      this.ipc.sendToRenderers(DeviceManagerMainEvent.DeviceConnected, data)
    } else {
      callRenderer(DeviceManagerMainEvent.DeviceConnectFailed, data)
      this.ipc.sendToRenderers(DeviceManagerMainEvent.DeviceConnectFailed, data)
    }
  }

  private async initializeDevice(
    portInfo: PortInfo
  ): Promise<BaseDevice | undefined> {
    const sleep = () => new Promise((resolve) => setTimeout(resolve, 500))
    const retryLimit = 20

    portInfo.productId = portInfo.productId?.toUpperCase()
    portInfo.vendorId = portInfo.vendorId?.toUpperCase()

    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-async-promise-executor
    return new Promise<BaseDevice | undefined>(async (resolve) => {
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

  private getDeviceByPath(path: string): BaseDevice | undefined {
    return this.devices.find((device) => device.portInfo.path === path)
  }

  private getDevicePaths(): string[] {
    return this.devices.map(({ portInfo }) => portInfo.path)
  }
}
