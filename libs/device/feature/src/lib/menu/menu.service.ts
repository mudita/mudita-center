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
  GeneralError,
  MenuConfig,
  MenuConfigValidator,
} from "device/models"
import { DeviceId } from "Core/device/constants/device-id"

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

    console.log("menu", JSON.stringify(response, null, 2))
    if (response.ok) {
      const menuConfig = MenuConfigValidator.safeParse(response.data.body)

      // TODO: Remove and replace with proper implementation on Kompakt side
      const fakedData: MenuConfig | undefined = menuConfig.success
        ? {
            ...menuConfig.data,
            menuItems: menuConfig.data.menuItems.map((item) => {
              if (item.feature === "mc-overview") {
                return {
                  ...item,
                  feature: "overview",
                }
              }
              return item
            }),
          }
        : undefined

      return menuConfig.success
        ? Result.success(fakedData!)
        : Result.failed(new AppError(GeneralError.IncorrectResponse, ""))
    }

    return Result.failed(response.error)
  }
}
