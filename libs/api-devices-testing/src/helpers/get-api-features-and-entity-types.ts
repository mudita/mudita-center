/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ApiConfig, ApiDevice } from "devices/api-device/models"
import { getApiDeviceConfig } from "./get-api-device-config"

export async function getApiFeaturesAndEntityTypes(device: ApiDevice): Promise<{
  features: string[]
  entityTypes: string[]
}> {
  const genericFeatures = [
    "mc-overview",
    "mc-contacts",
    // TODO: reenable when duplicates management is available
    // "mc-contacts-duplicates",
    "mc-data-migration",
    "mc-file-manager-internal",
  ].sort()

  const optionalFeatures = ["mc-file-manager-external"].sort()

  const testEntityTypes = [
    "contacts",
    "audioFiles",
    "imageFiles",
    "ebookFiles",
    "applicationFiles",
  ].sort()

  const result = await getApiDeviceConfig(device)

  const apiConfig = result.body as ApiConfig

  optionalFeatures.forEach((feature) => {
    if (
      apiConfig.features.includes(feature) &&
      !genericFeatures.includes(feature)
    ) {
      genericFeatures.push(feature)
    }
  })

  return { features: genericFeatures.sort(), entityTypes: testEntityTypes }
}
