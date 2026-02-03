/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ApiDeviceSerialPort } from "devices/api-device/adapters"
import { ApiDevice, buildFeatureConfigRequest } from "devices/api-device/models"

export const getFeatureConfig = (device: ApiDevice, feature: string) => {
  return ApiDeviceSerialPort.request(device, {
    ...buildFeatureConfigRequest({
      lang: "en-US",
      feature,
    }),
    options: {
      timeout: 3000,
    },
  })
}
