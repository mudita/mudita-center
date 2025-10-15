/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  Harmony,
  HarmonyDeleteQuotationRequest,
  HarmonyEndpointNamed,
  HarmonyMethodNamed,
} from "devices/harmony/models"
import { HarmonySerialPort } from "devices/harmony/adapters"

export const deleteQuotation = async (
  quotation: HarmonyDeleteQuotationRequest,
  device: Harmony
) => {
  const response = await HarmonySerialPort.request(device, {
    endpoint: HarmonyEndpointNamed.Quotations,
    method: HarmonyMethodNamed.Delete,
    body: quotation,
  })

  return response
}
