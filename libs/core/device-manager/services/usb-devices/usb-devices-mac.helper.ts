/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { PortInfo } from "serialport"
import { MacosUSBPortDeviceParser } from "shared/utils"
import { ProductID, VendorID } from "Core/device/constants"

export const getUsbDevicesMacOS = async (): Promise<PortInfo | void> => {
  try {
    const devices = await MacosUSBPortDeviceParser.getUSBPortDevices()
    const device = devices.find((device) => {
      return (
        device.vendorId?.includes(VendorID.MuditaHarmony) &&
        device.productId?.includes(ProductID.MuditaHarmonyMsc)
      )
    })

    if (device !== undefined) {
      return device
    }
  } catch (error) {
    console.error(error)
  }
}
