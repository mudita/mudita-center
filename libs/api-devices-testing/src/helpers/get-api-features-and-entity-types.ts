/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  ApiConfigResponseValidator,
  buildApiConfigRequest,
} from "devices/api-device/models"
import { SerialPortDevice } from "app-serialport/main"

export async function getApiFeaturesAndEntityTypes(
  apiDevice: SerialPortDevice
): Promise<{
  features: string[]
  entityTypes: string[]
}> {
  const genericFeatures = [
    "mc-overview",
    "mc-contacts",
    "mc-contacts-duplicates",
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

  const result = await apiDevice.request({
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
