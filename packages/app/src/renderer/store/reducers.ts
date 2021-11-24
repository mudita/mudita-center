/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { combineReducers } from "redux"
import { deviceReducer } from "App/device"
import { crashDumpReducer } from "App/crash-dump"
// TODO: Missing barrel to add to bellow domains
import { backupReducer } from "App/backup/reducers"
import { backupDeviceReducer } from "App/backup-device/reducers"
import { restoreDeviceReducer } from "App/restore-device/reducers/restore-device.reducer"
import { messagesReducer } from "App/messages/reducers"
import { modalsManagerReducer } from "App/modals-manager/reducers"

export const reducers = {
  device: deviceReducer,
  backup: backupReducer,
  backupDevice: backupDeviceReducer,
  restoreDevice: restoreDeviceReducer,
  crashDump: crashDumpReducer,
  messages: messagesReducer,
  modalsManager: modalsManagerReducer,
}

export const combinedReducers = combineReducers(reducers)
