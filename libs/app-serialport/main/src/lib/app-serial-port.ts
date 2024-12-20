/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { SerialPort } from "serialport"
import { PortInfo } from "@serialport/bindings-interface"
import { SerialPortApiDevice } from "./devices/api-device/serial-port-api-device"
import { SerialPortDevice } from "./devices/request-parser.interface"
import { APIRequestData, ChangedDevices, Device } from "app-serialport/models"
import EventEmitter from "events"

type DevicesChangeCallback = (data: ChangedDevices) => void

const isKnownDevice = (port: PortInfo): port is Device => {
  return port.productId !== undefined && port.vendorId !== undefined
}

export class AppSerialPort {
  private readonly instances = new Map<string, SerialPortDevice>()
  supportedDevices = [SerialPortApiDevice]
  attachedDevices: Device[] = []
  eventEmitter = new EventEmitter()

  constructor() {
    void this.checkForPortChanges()
    setInterval(() => {
      void this.checkForPortChanges()
    }, 2000)
  }

  private async checkForPortChanges() {
    const currentDevices = (await SerialPort.list()).filter((port) => {
      if (!isKnownDevice(port)) {
        return false
      }
      return this.supportedDevices.some((device) => {
        return (
          device.matchingVendorIds.includes(port.vendorId) &&
          device.matchingProductIds.includes(port.productId)
        )
      })
    }) as Device[]

    const removedDevices = this.attachedDevices.filter((device) => {
      return !currentDevices.find((newDevice) => newDevice.path === device.path)
    })

    this.attachedDevices = currentDevices

    removedDevices.forEach((device) => {
      this.removeInstance(device)
    })

    currentDevices.forEach((device) => {
      this.ensureInstance(device.path)
    })
  }

  private instanceExists(path: string) {
    return this.instances.has(path)
  }

  private createInstance(path: string) {
    const instance = this.getInstanceForDevice(path)
    if (instance) {
      const serialPort = new instance({ path, baudRate: 9600 })
      this.instances.set(path, serialPort)
      const change: Pick<ChangedDevices, "added"> = {
        added: this.getDeviceByPath(path),
      }
      this.eventEmitter.emit("devicesChanged", change)
    }
  }

  private removeInstance(device: Device) {
    const serialPort = this.instances.get(device.path)
    if (serialPort) {
      serialPort.destroy()
      this.instances.delete(device.path)
      const change: Pick<ChangedDevices, "removed"> = {
        removed: device,
      }
      this.eventEmitter.emit("devicesChanged", change)
    }
  }

  private ensureInstance(path: string) {
    if (!this.instanceExists(path)) {
      this.createInstance(path)
    }
    return this.instances.get(path)
  }

  private getDeviceByPath(path: string) {
    return this.attachedDevices.find((device) => device.path === path)
  }

  private getInstanceForDevice(path: string) {
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

  changeBaudRate(path: string, baudRate: number) {
    const serialPort = this.ensureInstance(path)
    serialPort?.update({ baudRate })
  }

  async request(path: string, data: APIRequestData) {
    return this.ensureInstance(path)?.request(data)
  }

  onDevicesChange(callback: DevicesChangeCallback) {
    this.eventEmitter.on(
      "devicesChanged",
      (changes: Omit<ChangedDevices, "all">) => {
        callback({
          all: this.attachedDevices,
          ...changes,
        })
      }
    )
  }
}
