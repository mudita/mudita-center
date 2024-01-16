/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Result, ResultObject } from "Core/core/builder"
import { IpcEvent } from "Core/core/decorators"
import { DeviceManager } from "Core/device-manager/services"
import { APIMenuServiceEvents, MenuConfig } from "device/models"

export class APIMenuService {
  constructor(private deviceManager: DeviceManager) {}

  @IpcEvent(APIMenuServiceEvents.GetMenuConfig)
  public async getMenuConfig(): Promise<ResultObject<MenuConfig>> {
    const response = await this.deviceManager.apiDevice.request({
      endpoint: "MENU_CONFIGURATION",
      method: "GET",
      body: {
        lang: "en-US",
      },
    })
    if (response.ok) {
      return Result.success(response.data.body as MenuConfig)
    }

    return Result.failed(response.error)
  }
}
