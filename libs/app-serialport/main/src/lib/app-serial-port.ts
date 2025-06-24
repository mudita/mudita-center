/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { SerialPort } from "serialport"
import { PortInfo } from "@serialport/bindings-interface"
import EventEmitter from "events"
import {
  SerialPortChangedDevices,
  SerialPortDeviceInfo,
  SerialPortDevicePath,
  SerialPortRequest,
} from "app-serialport/models"
import { devices, SerialPortDevice } from "app-serialport/devices"
import { getUsbDevices } from "./usb-devices/get-usb-devices"

type DevicesChangeCallback = (data: SerialPortChangedDevices) => void
enum SerialPortEvents {
  DevicesChanged = "devicesChanged",
}

export class AppSerialPort {
  private readonly instances = new Map<SerialPortDevicePath, SerialPortDevice>()
  private readonly supportedDevices = devices
  private readonly eventEmitter = new EventEmitter()
  currentDevices: SerialPortDeviceInfo[] = []
  addedDevices: SerialPortDeviceInfo[] = []
  removedDevices: SerialPortDeviceInfo[] = []

  constructor() {
    void this.detectChanges()
    setInterval(() => {
      void this.detectChanges()
    }, 250)
  }

  private getDeviceSerialPortInstance({
    vendorId,
    productId,
  }: Pick<SerialPortDeviceInfo | PortInfo, "vendorId" | "productId">) {
    if (!vendorId || !productId) {
      return undefined
    }
    return this.supportedDevices.find((device) => {
      return (
        device.matchingVendorIds.includes(vendorId) &&
        device.matchingProductIds.includes(productId)
      )
    })
  }

  private isSupportedDevice(
    { vendorId, productId }: PortInfo,
    { nonSerialPortDevice }: { nonSerialPortDevice?: boolean } = {}
  ) {
    if (!vendorId || !productId) {
      return false
    }
    const instance = this.getDeviceSerialPortInstance({ vendorId, productId })
    if (!instance) {
      return false
    }
    return nonSerialPortDevice ? instance.nonSerialPortDevice : true
  }

  private async listDevices() {
    const serialportDevices = await SerialPort.list()
    const usbDevices = await getUsbDevices()

    const devices = [
      ...serialportDevices.filter((portInfo) =>
        this.isSupportedDevice(portInfo)
      ),
      ...usbDevices.filter((portInfo) =>
        this.isSupportedDevice(portInfo, { nonSerialPortDevice: true })
      ),
    ]

    return devices
      .map((portInfo) => {
        const serialPortDevice = this.getDeviceSerialPortInstance(portInfo)
        if (!serialPortDevice) {
          return null
        }
        return {
          ...portInfo,
          deviceType: serialPortDevice.deviceType,
        }
      })
      .filter(Boolean) as SerialPortDeviceInfo[]
  }

  private async detectChanges() {
    const previousDevices = this.currentDevices
    const currentDevices = await this.listDevices()

    previousDevices
      .filter((device) => {
        return !currentDevices.find(
          (newDevice) =>
            newDevice.path === device.path &&
            newDevice.productId === device.productId
        )
      })
      .forEach((device) => {
        this.removedDevices.push(device)
      })

    currentDevices.forEach((device) => {
      if (!this.instances.has(device.path)) {
        this.addedDevices.push(device)
      }
    })

    this.currentDevices = currentDevices
    this.applyChanges()
  }

  private applyChanges() {
    this.removedDevices.forEach((device) => {
      this.removeInstance(device.path)
    })
    this.currentDevices.forEach((device) => {
      this.ensureInstance(device.path)
    })

    if (this.addedDevices.length > 0 || this.removedDevices.length > 0) {
      this.eventEmitter.emit(SerialPortEvents.DevicesChanged, {
        removed: this.removedDevices,
        added: this.addedDevices,
        all: this.currentDevices,
      })
    }

    this.addedDevices = []
    this.removedDevices = []
  }

  private instanceExists(path: SerialPortDevicePath) {
    return this.instances.has(path)
  }

  private createInstance(path: SerialPortDevicePath) {
    const deviceInfo = this.currentDevices.find(
      (device) => device.path === path
    )
    if (!deviceInfo) {
      throw new Error(`Could not create instance for device ${path}.`)
    }
    const SerialPortInstance = this.getDeviceSerialPortInstance(deviceInfo)
    if (SerialPortInstance) {
      const serialPort = new SerialPortInstance({ path })
      this.instances.set(path, serialPort as SerialPortDevice)
    }
  }

  private ensureInstance(path: SerialPortDevicePath) {
    if (!this.instanceExists(path)) {
      this.createInstance(path)
    }
    return this.instances.get(path) as SerialPortDevice
  }

  private removeInstance(path: SerialPortDevicePath) {
    const serialPort = this.instances.get(path)
    if (serialPort) {
      serialPort.destroy()
      this.instances.delete(path)
    }
  }

  changeBaudRate(path: SerialPortDevicePath, baudRate: number) {
    return this.ensureInstance(path)?.update({ baudRate })
  }

  onDevicesChange(callback: DevicesChangeCallback) {
    this.eventEmitter.on(
      SerialPortEvents.DevicesChanged,
      (changes: SerialPortChangedDevices) => {
        callback(changes)
      }
    )
  }

  getCurrentDevices(): Promise<SerialPortDeviceInfo[]> {
    return this.listDevices()
  }

  request(path: SerialPortDevicePath, data: SerialPortRequest) {
    return this.ensureInstance(path)?.request(data)
  }
}
