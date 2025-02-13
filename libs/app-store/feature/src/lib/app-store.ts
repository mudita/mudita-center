/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { configureStore } from "@reduxjs/toolkit"
import { devicesReducer } from "devices/common/feature"

export const store = configureStore({
  reducer: {
    devices: devicesReducer,
  },
})

export type StoreInstance = typeof store
export type AppStore = typeof store.getState
