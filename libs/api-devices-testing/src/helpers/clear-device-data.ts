/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { buildSystemPostRequest } from "devices/api-device/models"
import { ApiDeviceContext } from "./api-device-context"

export const clearDeviceData = async (apiDeviceContext: ApiDeviceContext) => {
  const { service, deviceId } = apiDeviceContext
  return await service.request(
    deviceId,
    buildSystemPostRequest({
      action: "clearData",
    })
  )
}
