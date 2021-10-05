/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { combineReducers } from "redux"
import { deviceReducer } from "App/device"
import { backupReducer } from "App/backup/reducers"
import { backupDeviceReducer } from "App/backup-device/reducers"

export const reducers = {
  device: deviceReducer,
  backup: backupReducer,
  backupDevice: backupDeviceReducer,
}

export const combinedReducers = combineReducers({
  device: deviceReducer,
  backup: backupReducer,
  backupDevice: backupDeviceReducer,
})
