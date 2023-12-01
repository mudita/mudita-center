/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceType } from "App/device/constants/device-type.constant"
import { FreshdeskTicketProduct } from "./create-freshdesk-ticket.types"

const DEVICE_TYPE_TO_PRODUCT: Record<DeviceType, FreshdeskTicketProduct> = {
  [DeviceType.MuditaHarmony]: FreshdeskTicketProduct.Harmony,
  [DeviceType.MuditaPure]: FreshdeskTicketProduct.Pure,
  [DeviceType.MuditaKompakt]: FreshdeskTicketProduct.Kompakt,
}

export const mapDeviceTypeToProduct = (
  device: DeviceType | null
): FreshdeskTicketProduct => {
  if (!device) {
    return FreshdeskTicketProduct.None
  }
  return DEVICE_TYPE_TO_PRODUCT[device]
}
