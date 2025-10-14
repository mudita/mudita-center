/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AppSettings } from "./app-settings"
import { DotNotation, DotValue, NestedPartial } from "app-utils/models"

export interface AppSettingsServiceModel {
  get(): AppSettings
  get<P extends DotNotation<AppSettings>>(path: P): DotValue<AppSettings, P>
  get<P extends DotNotation<AppSettings>>(
    path?: P
  ): DotValue<AppSettings, P> | AppSettings

  set(settings: NestedPartial<AppSettings>): AppSettings
}
