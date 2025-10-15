/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  Harmony,
  HarmonyEndpointNamed,
  HarmonyGetGroupQuotationRequest,
  HarmonyGetIntervalQuotationRequest,
  HarmonyMethodNamed,
} from "devices/harmony/models"
import { HarmonySerialPort } from "devices/harmony/adapters"

export const getHarmonyQuotationSettings = async (
  device: Harmony,
  body: HarmonyGetGroupQuotationRequest | HarmonyGetIntervalQuotationRequest
) => {
  const response = await HarmonySerialPort.request(device, {
    endpoint: HarmonyEndpointNamed.Quotations,
    method: HarmonyMethodNamed.Get,
    body,
  })

  return response
}
