/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { PortInfo } from "serialport"

export interface USBDevice {
  name?: string
  version?: string
  bsdName?: string

  manufacturer?: string | undefined
  serialNumber?: string | undefined
  locationId?: string | undefined
  productId?: string | undefined
  vendorId?: string | undefined
}

export interface USBPortDevice extends USBDevice, PortInfo {
  path: string
  pnpId?: string | undefined
}
