/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { EventEmitter } from "events"
import SerialPort, { PortInfo } from "serialport"
import UsbDetector from "./usb-detector"
import { CreateDevice, PureDevice, createDevice } from "./device"
import log, { LogConfig } from "./log-decorator"
import { LoggerFactory } from "./logger-factory"
import { PureLogger } from "./logger"

const logger = LoggerFactory.getInstance()

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
    private usbDetector: UsbDetector
  ) {}

  public init(): DeviceManager {
    this.registerAttachDeviceEmitter()
    return this
  }

  public registerLogger(l: PureLogger): void {
    logger.registerLogger(l)
  }

  public toggleLogs(enabled: boolean): void {
    logger.toggleLogs(enabled)
  }

  public async getDevices(): Promise<PureDevice[]> {
    const portList = await DeviceManager.getSerialPortList()

    return portList
      .filter(
        (portInfo) =>
          portInfo.productId?.toLowerCase() === productId &&
          portInfo.vendorId?.toLowerCase() === vendorId
      )
      .map(({ path }) => this.createDevice(path))
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

      if (portInfo.vendorId?.toLowerCase() === vendorId) {
        const retryLimit = 20
        for (let i = 0; i < retryLimit; i++) {
          const portList = await DeviceManager.getSerialPortList()

          const port = portList.find(
            ({ productId, vendorId }) =>
              // toLowerCase() is needed tu unify the codes as different platforms
              // shows them in different casing (eg. 045E vs 045e)
              portInfo.vendorId?.toLowerCase() === vendorId?.toLowerCase() &&
              portInfo.productId?.toLowerCase() === productId?.toLowerCase()
          )

          if (port) {
            const device = this.createDevice(port.path)
            this.emitAttachedDeviceEvent(device)

            break
          }
          await sleep()
        }
      }
    })
  }

  @log("==== serial port: list ====")
  private static async getSerialPortList(): Promise<PortInfo[]> {
    return await SerialPort.list()
  }

  @log("==== serial port: attached device ====", LogConfig.Args)
  private emitAttachedDeviceEvent(device: PureDevice) {
    this.#eventEmitter.emit(DeviceManagerEventName.AttachedDevice, device)
  }
}

const createDeviceManager = (
  createDevice: CreateDevice,
  usbDetector: UsbDetector
) => {
  return new DeviceManager(createDevice, usbDetector).init()
}

export default createDeviceManager(createDevice, new UsbDetector().init())
