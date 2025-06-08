/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DevicesReducer } from "devices/common/models"
import { AppMenuReducer } from "app-routing/models"
import { HelpReducer } from "help/models"
import { SettingsReducer } from "settings/models"
import { ContactSupportReducer } from "contact-support/models"

export type AppStore = {
  devices: DevicesReducer
  appMenu: AppMenuReducer
  help: HelpReducer
  settings: SettingsReducer
  contactSupport: ContactSupportReducer
}
