/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Controller, IpcEvent } from "App/core/decorators"
import {
  ControllerPrefix,
  IpcAppSettingsEvent,
} from "App/app-settings/constants"
import {
  AppSettings,
  SettingsUpdateOption,
} from "App/main/store/settings.interface"
import { AppSettingsService } from "App/app-settings/services"

@Controller(ControllerPrefix)
export class AppSettingsController {
  constructor(private appSettingsService: AppSettingsService) {}

  @IpcEvent(IpcAppSettingsEvent.Get)
  getAppSettings(): AppSettings {
    return this.appSettingsService.getAppSettings()
  }

  @IpcEvent(IpcAppSettingsEvent.Reset)
  resetAppSettings(): AppSettings {
    return this.appSettingsService.resetAppSettings()
  }

  @IpcEvent(IpcAppSettingsEvent.Update)
  updateAppSettings(option: SettingsUpdateOption): Partial<AppSettings> {
    return this.appSettingsService.updateAppSettings(option)
  }
}
