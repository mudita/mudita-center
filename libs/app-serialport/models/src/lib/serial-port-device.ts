/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { PortInfo } from "@serialport/bindings-interface"

export interface Device extends PortInfo {
  productId: string
  vendorId: string
}

export interface ChangedDevices {
  all: Device[]
  added?: Device
  removed?: Device
}