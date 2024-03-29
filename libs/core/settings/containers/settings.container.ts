/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { SettingsService } from "Core/settings/services"
import { settingsStore } from "Core/settings/store"

let settingsService: SettingsService

export const createSettingsService = (): SettingsService => {
  if (!settingsService) {
    settingsService = new SettingsService(settingsStore)
  }

  return settingsService
}

export const getSettingsService = (): SettingsService | undefined =>
  settingsService
