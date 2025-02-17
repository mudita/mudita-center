/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { configureStore } from "@reduxjs/toolkit"
import { devicesReducer } from "devices/common/feature"
import { AppState } from "app-store/models"

export const store = configureStore<AppState>({
  reducer: {
    devices: devicesReducer,
  },
})
