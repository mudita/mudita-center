/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { combineReducers } from "redux"
import { deviceReducer } from "App/device"

export const reducers = {
  device: deviceReducer,
}

export const combinedReducers = combineReducers({
  device: deviceReducer,
})
