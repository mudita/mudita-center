/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { combineReducers } from "redux"
import { deviceReducer } from "App/device"
import { crashDumpReducer } from "App/crash-dump"
import { backupReducer } from "App/backup"
import { backupDeviceReducer } from "App/backup-device"
import { restoreDeviceReducer } from "App/restore-device"
import { messagesReducer } from "App/messages"
import { modalsManagerReducer } from "App/modals-manager"
import { contactSupportReducer } from "App/contact-support"

export const reducers = {
  device: deviceReducer,
  backup: backupReducer,
  backupDevice: backupDeviceReducer,
  restoreDevice: restoreDeviceReducer,
  crashDump: crashDumpReducer,
  messages: messagesReducer,
  modalsManager: modalsManagerReducer,
  contactSupport: contactSupportReducer,
}

export const combinedReducers = combineReducers(reducers)
