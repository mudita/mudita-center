/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import merge from "lodash/merge"
import uniq from "lodash/uniq"
import { ApiConfig } from "device/models"
import { ApiResponse } from "Core/device/types/mudita-os"
import { ResultObject } from "Core/core/builder"

export class DevApiConfigAdapter {
  public static processDevModeResponse(
    response: ResultObject<ApiResponse<unknown>>
  ): ResultObject<ApiResponse<unknown>> {
    if (response.ok) {
      return merge({}, response, {
        data: {
          body: DevApiConfigAdapter.extendDataBody(response.data.body),
        },
      })
    }

    return response
  }

  private static extendDataBody = (body: unknown): ApiConfig => {
    const apiConfig = body as ApiConfig
    const newFeatures = ["fileManager"]
    return {
      ...apiConfig,
      features: uniq([...apiConfig.features, ...newFeatures]),
    }
  }
}
