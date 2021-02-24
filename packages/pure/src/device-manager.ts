/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { EventEmitter } from "events"
import SerialPort, { PortInfo } from "serialport"
import UsbDetector from "./usb-detector"
import { CreateDevice, PureDevice, createDevice } from "./device"

export const productId = "0622"
export const vendorId = "045e"
export const manufacturer = "Mudita"

enum DeviceManagerEventName {
  AttachedDevice = "AttachedDevice",
}

export interface PureDeviceManager {
  getDevices(): Promise<PureDevice[]>
  onAttachDevice(listener: (event: PureDevice) => void): void
  offAttachDevice(listener: (event: PureDevice) => void): void
  registerLogger(logger: any): void
}

class DeviceManager implements PureDeviceManager {
  #eventEmitter = new EventEmitter()

  constructor(
    private createDevice: CreateDevice,
    private usbDetector: UsbDetector,
    private logger?: any
  ) {}

  public init(): DeviceManager {
    this.registerAttachDeviceEmitter()
    return this
  }

  public registerLogger(logger: any) {
    this.logger = logger
  }

  public async getDevices(): Promise<PureDevice[]> {
    const portList = await this.getSerialPortList()

    return portList
      .filter(
        (portInfo) =>
          portInfo.productId?.toLowerCase() === productId &&
          portInfo.vendorId?.toLowerCase() === vendorId
      )
      .map(({ path }) => this.createDevice(path, this.logger))
  }

  public onAttachDevice(
    listener: (event: PureDevice) => Promise<void> | void
  ): void {
    this.#eventEmitter.on(DeviceManagerEventName.AttachedDevice, (event) => {
      void listener(event)
    })
  }

  public offAttachDevice(
    listener: (event: PureDevice) => Promise<void> | void
  ): void {
    this.#eventEmitter.off(DeviceManagerEventName.AttachedDevice, (event) => {
      void listener(event)
    })
  }

  private registerAttachDeviceEmitter(): void {
    this.usbDetector.onAttachDevice(async (portInfo) => {
      const sleep = () => new Promise((resolve) => setTimeout(resolve, 500))

      const retryLimit = 20
      for (let i = 0; i < retryLimit; i++) {
        const portList = await this.getSerialPortList()

        const port = portList.find(
          ({ productId, vendorId }) =>
            // toLowerCase() is needed tu unify the codes as different platforms
            // shows them in different casing (eg. 045E vs 045e)
            portInfo.vendorId?.toLowerCase() === vendorId?.toLowerCase() &&
            portInfo.productId?.toLowerCase() === productId?.toLowerCase()
        )

        if (port) {
          const device = this.createDevice(port.path, this.logger)
          this.logger?.info("==== device found ====")
          this.logger?.info(JSON.stringify(device, null, 2))

          this.#eventEmitter.emit(DeviceManagerEventName.AttachedDevice, device)
          break
        }
        await sleep()
      }
    })
  }

  private async getSerialPortList(): Promise<PortInfo[]> {
    const list = await SerialPort.list()
    this.logger?.info("==== serial ports list ====")
    this.logger?.info(JSON.stringify(list, null, 2))
    return list
  }
}

const createDeviceManager = (
  createDevice: CreateDevice,
  usbDetector: UsbDetector
) => {
  return new DeviceManager(createDevice, usbDetector).init()
}

export default createDeviceManager(createDevice, new UsbDetector().init())
