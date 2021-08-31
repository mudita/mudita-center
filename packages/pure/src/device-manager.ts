/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { EventEmitter } from "events"
import SerialPort, { PortInfo } from "serialport"
import UsbDetector from "./usb-detector"
import {
  CreateDevice,
  createDevice,
  PureDevice,
  PortInfoValidator,
  DeviceTypeResolverService,
} from "./device"
import log, { LogConfig } from "./logger/log-decorator"
import { LoggerFactory } from "./logger/logger-factory"
import { ConsoleLogger, PureLogger } from "./logger/logger"

const logger: PureLogger = LoggerFactory.getInstance()

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
  #deviceTypeResolver = new DeviceTypeResolverService()

  public currentDevice: PureDevice | null = null
  public connectedDevices: Record<string, PureDevice> = {}

  constructor(
    private createDevice: CreateDevice,
    private usbDetector: UsbDetector
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

  public async getDevices(): Promise<PureDevice[]> {
    const portList = await DeviceManager.getSerialPortList()

    return portList
      .filter(PortInfoValidator.isPortInfoMatch)
      .map(({ path, productId }) => {
        const deviceDescription = this.#deviceTypeResolver.resolve({
          productId,
        })
        return this.createDevice(path, deviceDescription!.deviceType)
      })
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

      if (PortInfoValidator.isVendorIdValid(portInfo)) {
        const retryLimit = 20
        for (let i = 0; i < retryLimit; i++) {
          const portList = await DeviceManager.getSerialPortList()

          const port = portList.find(PortInfoValidator.isPortInfoMatch)

          if (port) {
            const deviceDescription = this.#deviceTypeResolver.resolve(portInfo)
            const device = this.createDevice(
              port.path,
              deviceDescription!.deviceType
            )
            this.emitAttachedDeviceEvent(device)
            this.updateConnectedDevicesList(device, port.path)

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
  private emitAttachedDeviceEvent(device: PureDevice) {
    this.#eventEmitter.emit(DeviceManagerEventName.AttachedDevice, device)
  }

  private updateConnectedDevicesList(device: PureDevice, path: string) {
    this.connectedDevices[path] = device

    if (!this.currentDevice) {
      this.currentDevice = device
    }
  }
}

const createDeviceManager = (
  createDevice: CreateDevice,
  usbDetector: UsbDetector
) => {
  return new DeviceManager(createDevice, usbDetector).init()
}

export default createDeviceManager(createDevice, new UsbDetector().init())
