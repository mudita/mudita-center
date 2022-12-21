/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import SerialPort, { PortInfo as SerialPortInfo } from "serialport"
import { MainProcessIpc } from "electron-better-ipc"
import { log } from "App/core/decorators/log.decorator"
import { DeviceResolverService } from "App/device-manager/services/device-resolver.service"
import { AppError } from "App/core/errors"
import { Result, ResultObject } from "App/core/builder"
import { Device } from "App/device/modules/device"
import { PortInfo } from "App/device-manager/types"
import { PortInfoValidator } from "App/device-manager/validators"
import { ListenerEvent, DeviceManagerError } from "App/device-manager/constants"

export class DeviceManager {
  public currentDevice: Device | undefined
  public devicesMap = new Map<string, Device>()

  // The `updating` property is a tmp solution to skip sync process
  // The tech debt will be fixed as part ot tech task
  // https://appnroll.atlassian.net/browse/CP-1765
  public updating = false

  constructor(
    private deviceResolver: DeviceResolverService,
    private ipc: MainProcessIpc
  ) {}

  get device(): Device {
    if (!this.currentDevice) {
      throw new AppError(
        DeviceManagerError.NoCurrentDevice,
        "Current device is undefined"
      )
    }

    return this.currentDevice
  }

  get devices(): Device[] {
    return Array.from(this.devicesMap.values())
  }

  public async addDevice(port: PortInfo): Promise<void> {
    const device = await this.initializeDevice(port)

    if (!device) {
      throw new AppError(
        DeviceManagerError.CannotInitializeDeviceObject,
        `Cannot initialize device object for ${port.productId || ""}`
      )
    }

    this.devicesMap.set(device.path, device)

    if (!this.currentDevice) {
      this.currentDevice = device
      this.ipc.sendToRenderers(
        ListenerEvent.CurrentDeviceChanged,
        this.currentDevice
      )
    }

    this.ipc.sendToRenderers(ListenerEvent.DeviceAttached, device)
  }

  public removeDevice(path: string): void {
    this.devicesMap.delete(path)

    if (this.currentDevice?.path === path) {
      if (this.devicesMap.size > 0) {
        this.currentDevice = this.devicesMap.values().next().value as Device
      } else {
        this.currentDevice = undefined
      }

      this.ipc.sendToRenderers(
        ListenerEvent.CurrentDeviceChanged,
        this.currentDevice
      )
    }

    this.ipc.sendToRenderers(ListenerEvent.DeviceDetached, path)
  }

  public setCurrentDevice(path: string): ResultObject<boolean> {
    const newCurrentDevice = this.devicesMap.get(path)

    if (!newCurrentDevice) {
      return Result.failed(
        new AppError(
          DeviceManagerError.CannotFindDevice,
          `Device ${path} can't be found`
        )
      )
    }

    this.currentDevice = newCurrentDevice

    this.ipc.sendToRenderers(
      ListenerEvent.CurrentDeviceChanged,
      this.currentDevice
    )

    return Result.success(true)
  }

  public async getConnectedDevices(): Promise<SerialPortInfo[]> {
    const portList = await this.getSerialPortList()

    return (
      portList
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/unbound-method
        .filter(PortInfoValidator.isPortInfoMatch)
    )
  }

  private async initializeDevice(
    portInfo: PortInfo
  ): Promise<Device | undefined> {
    const sleep = () => new Promise((resolve) => setTimeout(resolve, 500))
    const retryLimit = 20

    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-async-promise-executor
    return new Promise(async (resolve) => {
      for (let i = 0; i < retryLimit; i++) {
        const portList = await this.getConnectedDevices()
        const port = portList.find(
          ({ productId, vendorId }) =>
            productId === portInfo.productId && vendorId === portInfo.vendorId
        )

        if (port) {
          const device = this.deviceResolver.resolve(portInfo, port.path)

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

  @log("==== serial port: list ====")
  private getSerialPortList(): Promise<SerialPortInfo[]> {
    return SerialPort.list()
  }
}
