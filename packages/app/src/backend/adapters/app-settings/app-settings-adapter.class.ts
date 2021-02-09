/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import {
  AppSettings,
  SettingsUpdateOption,
} from "App/main/store/settings.interface"

export default abstract class AppSettingsAdapter {
  public abstract getAppSettings(): AppSettings
  public abstract resetAppSettings(): AppSettings
  public abstract updateAppSettings(
    option: SettingsUpdateOption
  ): Partial<AppSettings>
}
