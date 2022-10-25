/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { EventEmitter } from "events"
import SerialPort, { PortInfo } from "serialport"
import { LoggerFactory } from "App/core/factories"
import { DeviceLogger, ConsoleLogger } from "App/core/types"
import { log, LogConfig } from "App/core/decorators/log.decorator"
import { UsbDetector } from "App/device/services/usb-detector.service"
import { PortInfoValidator } from "App/device/validators"
import { DeviceResolverService } from "App/device/services/device-resolver.service"
import { Device } from "App/device/modules/device"

enum DeviceManagerEventName {
  AttachedDevice = "AttachedDevice",
}

export interface DeviceManagerClass {
  getDevices(): Promise<Device[]>
  onAttachDevice(listener: (event: Device) => void): void
  offAttachDevice(listener: (event: Device) => void): void
}

export class DeviceManager implements DeviceManagerClass {
  private eventEmitter = new EventEmitter()
  private logger: DeviceLogger = LoggerFactory.getInstance()

  constructor(
    private usbDetector: UsbDetector,
    private deviceResolver: DeviceResolverService
  ) {
    this.registerAttachDeviceEmitter()
  }

  public registerLogger(logger: ConsoleLogger): void {
    this.logger.registerLogger(logger)
  }

  public toggleLogs(enabled: boolean): void {
    this.logger.toggleLogs(enabled)
  }

  public async getDevices(): Promise<Device[]> {
    const portList = await this.getSerialPortList()

    return (
      portList
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/unbound-method
        .filter(PortInfoValidator.isPortInfoMatch)
        .map(({ path, productId }) => {
          return this.deviceResolver.resolve({ productId }, path) as Device
        })
    )
  }

  public onAttachDevice(
    listener: (event: Device) => Promise<void> | void
  ): void {
    this.eventEmitter.on(DeviceManagerEventName.AttachedDevice, (event) => {
      void listener(event)
    })
  }

  public offAttachDevice(
    listener: (event: Device) => Promise<void> | void
  ): void {
    this.eventEmitter.off(DeviceManagerEventName.AttachedDevice, (event) => {
      void listener(event)
    })
  }

  private registerAttachDeviceEmitter(): void {
    this.usbDetector.onAttachDevice(async (portInfo) => {
      const sleep = () => new Promise((resolve) => setTimeout(resolve, 500))

      if (PortInfoValidator.isVendorIdValid(portInfo)) {
        const retryLimit = 20
        for (let i = 0; i < retryLimit; i++) {
          const portList = await this.getSerialPortList()

          // AUTO DISABLED - fix me if you like :)
          // eslint-disable-next-line @typescript-eslint/unbound-method
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

  @log("==== serial port: attached device ====", LogConfig.Args)
  private emitAttachedDeviceEvent(device: Device) {
    this.eventEmitter.emit(DeviceManagerEventName.AttachedDevice, device)
  }

  @log("==== serial port: list ====")
  private getSerialPortList(): Promise<PortInfo[]> {
    return SerialPort.list()
  }
}
