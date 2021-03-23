/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { EventEmitter } from "events"
import SerialPort, { PortInfo } from "serialport"
import UsbDetector from "./usb-detector"
import { CreateDevice, PureDevice, createDevice } from "./device"
import Logger from "./logger"

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
}

class DeviceManager implements PureDeviceManager {
  #eventEmitter = new EventEmitter()

  constructor(
    private createDevice: CreateDevice,
    private usbDetector: UsbDetector,
    private logger: Logger
  ) {}

  public init(): DeviceManager {
    this.registerAttachDeviceEmitter()
    return this
  }

  public toggleLogs(enabled: boolean): void {
    this.logger.toggleLogs(enabled)
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
      this.logger.log("==== usb detector: attached device ====")
      this.logger.log(JSON.stringify(portInfo, null, 2))

      const sleep = () => new Promise((resolve) => setTimeout(resolve, 500))

      if (portInfo.vendorId?.toLowerCase() === vendorId) {
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
            this.logger.log(
              "==== serial port: attached device is pure device ===="
            )
            this.logger.log(JSON.stringify(device, null, 2))
            this.#eventEmitter.emit(
              DeviceManagerEventName.AttachedDevice,
              device
            )
            break
          }
          await sleep()
        }
      }
    })
  }

  private async getSerialPortList(): Promise<PortInfo[]> {
    const list = await SerialPort.list()
    this.logger.log("==== serial port: list ====")
    this.logger.log(JSON.stringify(list, null, 2))
    return list
  }
}

const createDeviceManager = (
  createDevice: CreateDevice,
  usbDetector: UsbDetector,
  logger: Logger
) => {
  return new DeviceManager(createDevice, usbDetector, logger).init()
}

export default createDeviceManager(
  createDevice,
  new UsbDetector().init(),
  new Logger()
)
