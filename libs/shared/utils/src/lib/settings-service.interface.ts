/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Settings, SettingsUpdateOption } from "Core/settings/dto"
import { SettingsValue } from "Core/settings/types"

export interface ISettingsService {
  init(): void
  getSettings(): Settings
  resetSettings(): Settings
  updateSettings(option: SettingsUpdateOption): SettingsValue
  getByKey(key: keyof Settings): SettingsValue
}
