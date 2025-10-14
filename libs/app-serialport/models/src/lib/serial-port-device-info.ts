/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { PortInfo } from "@serialport/bindings-interface"
import {
  SerialPortDeviceSubtype,
  SerialPortDeviceType,
} from "./serial-port-device-type"

export interface SerialPortDeviceInfo<DeviceType = SerialPortDeviceType>
  extends PortInfo {
  id: string
  productId: string
  vendorId: string
  otherProductIds?: string[]
  otherVendorIds?: string[]
  deviceType: DeviceType
  deviceSubtype?: SerialPortDeviceSubtype
}

export type SerialPortDeviceId = SerialPortDeviceInfo["id"]

export interface SerialPortChangedDevices {
  all: SerialPortDeviceInfo[]
  added: SerialPortDeviceInfo[]
  removed: SerialPortDeviceInfo[]
}
