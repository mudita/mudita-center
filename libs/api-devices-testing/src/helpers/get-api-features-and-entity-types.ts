/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  ApiConfigResponseValidator,
  buildApiConfigRequest,
} from "devices/api-device/models"
import { ApiDeviceContext } from "./api-device-context"

export async function getApiFeaturesAndEntityTypes(
  apiDeviceContext: ApiDeviceContext
): Promise<{
  features: string[]
  entityTypes: string[]
}> {
  const { service, deviceId } = apiDeviceContext
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

  const result = await service.request(deviceId, {
    ...buildApiConfigRequest(),
    options: { timeout: 5000 },
  })

  const apiConfig = ApiConfigResponseValidator.parse(result.body)

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
