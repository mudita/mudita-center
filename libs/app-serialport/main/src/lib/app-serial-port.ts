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

type DevicesChangeCallback = (data: SerialPortChangedDevices) => void
enum SerialPortEvents {
  DevicesChanged = "devicesChanged",
}

export class AppSerialPort {
  private readonly instances = new Map<SerialPortDevicePath, SerialPortDevice>()
  private readonly supportedDevices = devices
  private readonly eventEmitter = new EventEmitter()
  private currentDevices: SerialPortDeviceInfo[] = []
  private addedDevices: SerialPortDeviceInfo[] = []
  private removedDevices: SerialPortDeviceInfo[] = []

  constructor() {
    void this.detectChanges()
    setInterval(() => {
      void this.detectChanges()
    }, 3000)
  }

  private isKnownDevice(port: PortInfo): port is SerialPortDeviceInfo {
    return port.productId !== undefined && port.vendorId !== undefined
  }

  private async detectChanges() {
    const currentDevices = (await SerialPort.list()).filter((port) => {
      if (!this.isKnownDevice(port)) {
        return false
      }
      return this.supportedDevices.some((device) => {
        return (
          device.matchingVendorIds.includes(port.vendorId) &&
          device.matchingProductIds.includes(port.productId)
        )
      })
    }) as SerialPortDeviceInfo[]

    this.currentDevices
      .filter((device) => {
        return !currentDevices.find(
          (newDevice) => newDevice.path === device.path
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
      this.currentDevices = this.currentDevices.map((device) => {
        const SerialPortInstance = this.getDeviceSerialPortInstance(
          device.path
        ) as typeof SerialPortDevice
        return { ...device, deviceType: SerialPortInstance.deviceType }
      })

      this.addedDevices = this.addedDevices.map((device) => {
        const SerialPortInstance = this.getDeviceSerialPortInstance(
          device.path
        ) as typeof SerialPortDevice
        return { ...device, deviceType: SerialPortInstance.deviceType }
      })

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
    const SerialPortInstance = this.getDeviceSerialPortInstance(path)
    if (SerialPortInstance) {
      const serialPort = new SerialPortInstance({ path })
      this.instances.set(path, serialPort)
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

  private getDeviceByPath(path: SerialPortDevicePath) {
    return this.currentDevices.find((device) => device.path === path)
  }

  private getDeviceSerialPortInstance(path: SerialPortDevicePath) {
    const port = this.getDeviceByPath(path)
    if (!port) {
      return
    }
    return this.supportedDevices.find((device) => {
      return (
        device.matchingVendorIds.includes(port.vendorId) &&
        device.matchingProductIds.includes(port.productId)
      )
    })
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

  request(path: SerialPortDevicePath, data: SerialPortRequest) {
    return this.ensureInstance(path)?.request(data)
  }
}
