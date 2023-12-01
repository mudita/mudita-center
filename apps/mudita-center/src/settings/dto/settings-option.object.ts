/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Settings } from "App/settings/dto/settings.object"

export interface SettingsUpdateOption {
  key: keyof Settings
  value: unknown
}
