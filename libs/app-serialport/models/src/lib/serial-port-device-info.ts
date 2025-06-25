/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { PortInfo } from "@serialport/bindings-interface"
import {
  SerialPortDeviceSubtype,
  SerialPortDeviceType,
} from "./serial-port-device-type"

export type SerialPortDevicePath = string

export interface SerialPortDeviceInfo<DeviceType = SerialPortDeviceType>
  extends PortInfo {
  productId: string
  vendorId: string
  deviceType: DeviceType
  deviceSubtype?: SerialPortDeviceSubtype
}

export interface SerialPortChangedDevices {
  all: SerialPortDeviceInfo[]
  added: SerialPortDeviceInfo[]
  removed: SerialPortDeviceInfo[]
}
