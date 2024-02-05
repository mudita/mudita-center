/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Result, ResultObject } from "Core/core/builder"
import { IpcEvent } from "Core/core/decorators"
import { AppError } from "Core/core/errors"
import { DeviceManager } from "Core/device-manager/services"
import {
  APIMenuServiceEvents,
  MenuConfig,
  MenuConfigValidator,
} from "device/models"
import { DeviceId } from "Core/device/constants/device-id"
import { GeneralError } from "../general-error"

export class APIMenuService {
  constructor(private deviceManager: DeviceManager) {}

  @IpcEvent(APIMenuServiceEvents.GetMenuConfig)
  public async getMenuConfig(
    deviceId?: DeviceId
  ): Promise<ResultObject<MenuConfig>> {
    const device = deviceId
      ? this.deviceManager.getAPIDeviceById(deviceId)
      : this.deviceManager.apiDevice

    if (!device) {
      return Result.failed(new AppError(GeneralError.NoDevice, ""))
    }

    const response = await device.request({
      endpoint: "MENU_CONFIGURATION",
      method: "GET",
      body: {
        lang: "en-US",
      },
    })
    if (response.ok) {
      const menuConfig = MenuConfigValidator.safeParse(response.data.body)

      return menuConfig.success
        ? Result.success(menuConfig.data)
        : Result.failed(new AppError(GeneralError.IncorrectResponse, ""))
    }

    return Result.failed(response.error)
  }
}
