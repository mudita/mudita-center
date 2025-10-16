/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ApiDevice, PreRestoreRequest } from "devices/api-device/models"
import { preRestore } from "../../api/pre-restore"

interface PreRestoreStepParams extends PreRestoreRequest {
  device: ApiDevice
}

export const preRestoreStep = async ({
  device,
  restoreId,
  features,
}: PreRestoreStepParams) => {
  const preRestoreResponse = await preRestore(device, {
    restoreId,
    features,
  })
  if (!preRestoreResponse.ok) {
    throw new Error("Failed to prepare for restore")
  }

  return features.map(({ feature }) => {
    const filePath = preRestoreResponse.body.features[feature]
    if (!filePath) {
      throw new Error(`Device did not provide path for feature ${feature}`)
    }
    return {
      feature,
      filePath,
    }
  })
}
