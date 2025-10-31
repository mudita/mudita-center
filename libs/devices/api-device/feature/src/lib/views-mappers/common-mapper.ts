/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  CommonFeatureConfigResponse,
  CommonFeatureDataResponse,
} from "devices/api-device/models"

export const mapCommonFeature = (
  data: CommonFeatureDataResponse,
  config: CommonFeatureConfigResponse
) => {
  return {
    title: config.main.screenTitle,
    ...(config.main.component === "mc-contacts-view" && {
      entityType: config.main.config.entityTypes[0],
    }),
  }
}
