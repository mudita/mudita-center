/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Controller, IpcEvent } from "App/core/decorators"
import { ControllerPrefix, IpcAppSettingsEvent } from "App/settings/constants"
import { Settings, SettingsUpdateOption } from "App/settings/dto"
import { SettingsService } from "App/settings/services"
import { SettingsValue } from "App/settings/types"

@Controller(ControllerPrefix)
export class SettingsController {
  constructor(private settingsService: SettingsService) {}

  @IpcEvent(IpcAppSettingsEvent.Get)
  getSettings(): Settings {
    return this.settingsService.getSettings()
  }

  @IpcEvent(IpcAppSettingsEvent.Reset)
  resetSettings(): Settings {
    return this.settingsService.resetSettings()
  }

  @IpcEvent(IpcAppSettingsEvent.Update)
  updateSettings(option: SettingsUpdateOption): SettingsValue {
    return this.settingsService.updateSettings(option)
  }
}
