/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceType } from "./constants"
import { McSerialPortDeviceClass } from "../mc-serial-port-device/mc-serial-port-device.class"
import { McUsbDeviceClass, McUsbFile } from "../mc-usb-device"
import { RequestConfig, Response } from "../mc-serial-port-device"

export enum DeviceEventName {
  Disconnected = "disconnected",
  DataReceived = "dataReceived",
}

export interface MuditaDevice
  extends McSerialPortDeviceClass,
    McUsbDeviceClass {
  path: string
  deviceType: DeviceType
  connect(): Promise<Response>
  disconnect(): Promise<Response>
  request(config: RequestConfig<any>): Promise<Response<any>>
  on(eventName: DeviceEventName, listener: () => void): void
  off(eventName: DeviceEventName, listener: () => void): void
  getFiles(): Promise<McUsbFile[]>
}

export type CreateDeviceStrategy = (
  mcSerialPortDevice: McSerialPortDeviceClass,
  mcUscDevice: McUsbDeviceClass
) => MuditaDevice
