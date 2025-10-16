/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  Harmony,
  HarmonyEndpointNamed,
  HarmonyMethodNamed,
  HarmonyPostQuotationRequest,
} from "devices/harmony/models"
import { HarmonySerialPort } from "devices/harmony/adapters"

export const createQuotation = async (
  quotation: HarmonyPostQuotationRequest,
  device: Harmony
) => {
  const response = await HarmonySerialPort.request(device, {
    endpoint: HarmonyEndpointNamed.Quotations,
    method: HarmonyMethodNamed.Post,
    body: quotation,
  })

  return response
}
