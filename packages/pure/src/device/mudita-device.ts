/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceType } from "./constants"
import { McUsbFile } from "../mc-usb-device/mc-usb-file.interface"
import { McSerialPortDeviceClass } from "../mc-serial-port-device/mc-serial-port-device.class"
import { McUsbDeviceClass } from "../mc-usb-device/mc-usb-device.class"
import { RequestConfig, Response } from "../mc-serial-port-device/types"
import { ObjectResult } from "../mc-usb-device/usb-device.service"

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
  getFiles(): Promise<ObjectResult<McUsbFile[]>>
}

export type CreateDeviceStrategy = (
  mcSerialPortDevice: McSerialPortDeviceClass,
  mcUscDevice: McUsbDeviceClass
) => MuditaDevice
