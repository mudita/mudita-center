/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import merge from "lodash/merge"
import unionBy from "lodash/unionBy"
import { MenuConfig } from "device/models"
import { IconType } from "generic-view/utils"
import { ResultObject } from "Core/core/builder"
import { ApiResponse } from "Core/device/types/mudita-os"

export class DevMenuAdapter {
  public static processDevModeResponse(
    response: ResultObject<ApiResponse<unknown>>
  ): ResultObject<ApiResponse<unknown>> {
    if (response.ok) {
      return merge({}, response, {
        data: {
          body: DevMenuAdapter.extendDataBody(response.data.body),
        },
      })
    }

    return response
  }

  private static extendDataBody = (body: unknown): MenuConfig => {
    const menuConfig = body as MenuConfig
    const newMenuItems = [
      {
        feature: "mc-file-manager-internal",
        displayName: "Manage Files",
        icon: IconType.FileManager,
        submenu: [
          {
            feature: "mc-file-manager-internal",
            displayName: "Phone storage",
          },
          {
            feature: "mc-file-manager-external",
            displayName: "SD card",
          },
        ],
      },
    ]
    return {
      ...menuConfig,
      menuItems: unionBy(menuConfig.menuItems || [], newMenuItems, "feature"),
    }
  }
}
