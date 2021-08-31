/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { EventEmitter } from "events"
import SerialPort, { PortInfo } from "serialport"
import UsbDetector from "./usb-detector"
import {
  MuditaDevice,
  PortInfoValidator,
  DeviceResolverService,
} from "./device"
import log, { LogConfig } from "./logger/log-decorator"
import { LoggerFactory } from "./logger/logger-factory"
import { ConsoleLogger, PureLogger } from "./logger/logger"

const logger: PureLogger = LoggerFactory.getInstance()

enum DeviceManagerEventName {
  AttachedDevice = "AttachedDevice",
}

export interface MuditaDeviceManager {
  getDevices(): Promise<MuditaDevice[]>
  onAttachDevice(listener: (event: MuditaDevice) => void): void
  offAttachDevice(listener: (event: MuditaDevice) => void): void
}

class DeviceManager implements MuditaDeviceManager {
  #eventEmitter = new EventEmitter()

  constructor(
    private usbDetector: UsbDetector,
    private deviceResolver: DeviceResolverService
  ) {}

  public init(): DeviceManager {
    this.registerAttachDeviceEmitter()
    return this
  }

  public registerLogger(l: ConsoleLogger): void {
    logger.registerLogger(l)
  }

  public toggleLogs(enabled: boolean): void {
    logger.toggleLogs(enabled)
  }

  public async getDevices(): Promise<MuditaDevice[]> {
    const portList = await DeviceManager.getSerialPortList()

    return portList
      .filter(PortInfoValidator.isPortInfoMatch)
      .map(({ path, productId }) => {
        return this.deviceResolver.resolve({ productId }, path) as MuditaDevice
      })
  }

  public onAttachDevice(
    listener: (event: MuditaDevice) => Promise<void> | void
  ): void {
    this.#eventEmitter.on(DeviceManagerEventName.AttachedDevice, (event) => {
      void listener(event)
    })
  }

  public offAttachDevice(
    listener: (event: MuditaDevice) => Promise<void> | void
  ): void {
    this.#eventEmitter.off(DeviceManagerEventName.AttachedDevice, (event) => {
      void listener(event)
    })
  }

  private registerAttachDeviceEmitter(): void {
    this.usbDetector.onAttachDevice(async (portInfo) => {
      const sleep = () => new Promise((resolve) => setTimeout(resolve, 500))

      if (PortInfoValidator.isVendorIdValid(portInfo)) {
        const retryLimit = 20
        for (let i = 0; i < retryLimit; i++) {
          const portList = await DeviceManager.getSerialPortList()

          const port = portList.find(PortInfoValidator.isPortInfoMatch)

          if (port) {
            const device = this.deviceResolver.resolve(portInfo, port.path)

            if (!device) {
              return
            }

            this.emitAttachedDeviceEvent(device)

            break
          }
          await sleep()
        }
      }
    })
  }

  @log("==== serial port: list ====")
  private static getSerialPortList(): Promise<PortInfo[]> {
    return SerialPort.list()
  }

  @log("==== serial port: attached device ====", LogConfig.Args)
  private emitAttachedDeviceEvent(device: MuditaDevice) {
    this.#eventEmitter.emit(DeviceManagerEventName.AttachedDevice, device)
  }
}

const createDeviceManager = (
  usbDetector: UsbDetector,
  deviceResolver: DeviceResolverService
) => {
  return new DeviceManager(usbDetector, deviceResolver).init()
}

export default createDeviceManager(
  new UsbDetector().init(),
  new DeviceResolverService()
)
