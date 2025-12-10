/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  FlashRequest,
  HarmonyMsc,
  HarmonyMscEndpointNamed,
  HarmonyMscMethodNamed,
} from "devices/harmony-msc/models"
import { AppError, AppResultFactory } from "app-utils/models"
import { HarmonyMscSerialPort } from "devices/harmony-msc/adapters"

export const postFlash = async (
  device: HarmonyMsc,
  { imagePath, scriptPath }: FlashRequest
) => {
  const response = await HarmonyMscSerialPort.request(device, {
    endpoint: HarmonyMscEndpointNamed.Flash,
    method: HarmonyMscMethodNamed.Post,
    options: {
      timeout: 200_000,
    },
    body: {
      imagePath,
      scriptPath,
    },
  })

  return response.ok
    ? AppResultFactory.success(response)
    : AppResultFactory.failed(new AppError("Flashing failed"))
}
