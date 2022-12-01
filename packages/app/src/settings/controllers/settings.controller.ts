/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Controller, IpcEvent } from "App/core/decorators"
import {
  SettingsControllerPrefix,
  IpcSettingsEvent,
} from "App/settings/constants"
import { Settings, SettingsUpdateOption } from "App/settings/dto"
import { SettingsService } from "App/settings/services"
import { SettingsValue } from "App/settings/types"

@Controller(SettingsControllerPrefix)
export class SettingsController {
  constructor(private settingsService: SettingsService) {}

  @IpcEvent(IpcSettingsEvent.Get)
  getSettings(): Settings {
    return this.settingsService.getSettings()
  }

  @IpcEvent(IpcSettingsEvent.Reset)
  resetSettings(): Settings {
    return this.settingsService.resetSettings()
  }

  @IpcEvent(IpcSettingsEvent.Update)
  updateSettings(option: SettingsUpdateOption): SettingsValue {
    return this.settingsService.updateSettings(option)
  }
}
