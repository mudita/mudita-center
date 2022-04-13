/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AppSettingsService } from "App/app-settings/services"
import settingsStore from "App/main/store/settings"

let appSettingsService: AppSettingsService

export const createAppSettingsService = (): AppSettingsService => {
  if (!appSettingsService) {
    appSettingsService = new AppSettingsService(settingsStore)
  }

  return appSettingsService
}

export const getAppSettingsService = (): AppSettingsService | undefined =>
  appSettingsService
