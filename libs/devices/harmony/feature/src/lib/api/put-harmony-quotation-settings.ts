/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  Harmony,
  HarmonyEndpointNamed,
  HarmonyMethodNamed,
  HarmonyPutGroupQuotationRequest,
  HarmonyPutIntervalQuotationRequest,
} from "devices/harmony/models"
import { HarmonySerialPort } from "devices/harmony/adapters"

export const putHarmonyQuotationSettings = async (
  device: Harmony,
  body: HarmonyPutGroupQuotationRequest | HarmonyPutIntervalQuotationRequest
) => {
  const response = await HarmonySerialPort.request(device, {
    endpoint: HarmonyEndpointNamed.Quotations,
    method: HarmonyMethodNamed.Put,
    body,
  })

  return response
}
