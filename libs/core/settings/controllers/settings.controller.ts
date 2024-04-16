/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IpcEvent } from "Core/core/decorators"
import { IpcSettingsEvent } from "Core/settings/constants"
import { Settings, SettingsUpdateOption } from "Core/settings/dto"
import { SettingsService } from "Core/settings/services"
import { SettingsValue } from "Core/settings/types"

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
