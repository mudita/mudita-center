/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ApiDeviceSerialPort } from "devices/api-device/adapters"
import { ApiDevice, buildFeatureDataRequest } from "devices/api-device/models"

export const getFeatureData = (device: ApiDevice, feature: string) => {
  return ApiDeviceSerialPort.request(device, {
    ...buildFeatureDataRequest({
      lang: "en-US",
      feature,
    }),
    options: {
      timeout: 3000,
    },
  })
}
