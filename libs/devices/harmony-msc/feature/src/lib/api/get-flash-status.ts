/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  HarmonyMsc,
  HarmonyMscEndpointNamed,
  HarmonyMscMethodNamed,
} from "devices/harmony-msc/models"
import { AppError, AppResultFactory } from "app-utils/models"
import { HarmonyMscSerialPort } from "devices/harmony-msc/adapters"

export const getFlashStatus = async (device: HarmonyMsc) => {
  const response = await HarmonyMscSerialPort.request(device, {
    endpoint: HarmonyMscEndpointNamed.Flash,
    method: HarmonyMscMethodNamed.Get,
    options: {
      timeout: 200_000,
    },
  })

  return response.ok
    ? AppResultFactory.success(response)
    : AppResultFactory.failed(new AppError("Getting flash status failed"))
}
