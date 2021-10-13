/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { combineReducers } from "redux"
import { deviceReducer } from "App/device"
import { crashDumpReducer } from "App/crash-dump"
import { backupReducer } from "App/backup/reducers"
import { backupDeviceReducer } from "App/backup-device/reducers"
import { restoreDeviceReducer } from "App/restore-device/reducers/restore-device.reducer"

export const reducers = {
  device: deviceReducer,
  backup: backupReducer,
  backupDevice: backupDeviceReducer,
  restoreDevice: restoreDeviceReducer,
  crashDump: crashDumpReducer,
}

export const combinedReducers = combineReducers(reducers)
