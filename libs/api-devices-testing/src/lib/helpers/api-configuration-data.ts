/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceProtocol } from "device-protocol/feature"
import { APIConfigService } from "device/feature"
import { ApiConfig } from "device/models"

export async function getApiFeaturesAndEntityTypes(
  deviceProtocol: DeviceProtocol
): Promise<{
  features: string[]
  entityTypes: string[]
}> {
  const genericFeatures = [
    "mc-overview",
    "mc-contacts",
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

  const apiConfigService = new APIConfigService(deviceProtocol)
  const result = await apiConfigService.getAPIConfig()
  const apiConfig = result.data as ApiConfig

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
