/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { configureStore } from "@reduxjs/toolkit"
import { AppStore } from "app-store/models"
import { devicesReducer } from "devices/common/feature"
import { appMenuReducer } from "app-routing/feature"
import { helpReducer } from "help/feature"
import { settingsReducer } from "settings/feature"
import { contactSupportReducer } from "contact-support/feature"

export const store = configureStore<AppStore>({
  reducer: {
    devices: devicesReducer,
    appMenu: appMenuReducer,
    help: helpReducer,
    settings: settingsReducer,
    contactSupport: contactSupportReducer,
  },
})
