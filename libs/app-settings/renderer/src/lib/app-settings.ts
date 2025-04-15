/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import "types-preload"
import { AppSettings as AppSettingsModel } from "app-settings/models"
import { NestedPartial } from "app-utils/models"

export class AppSettings {
  static get() {
    return window.api.appSettings.get()
  }

  static set(settings: NestedPartial<AppSettingsModel>) {
    return window.api.appSettings.set(settings)
  }
}
