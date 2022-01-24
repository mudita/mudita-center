/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { combineReducers } from "redux"
import { deviceReducer } from "App/device/reducers"
import { crashDumpReducer } from "App/crash-dump/reducers"
import { backupReducer } from "App/backup/reducers"
import { backupDeviceReducer } from "App/backup-device/reducers"
import { restoreDeviceReducer } from "App/restore-device/reducers"
import { messagesReducer } from "App/messages/reducers"
import { modalsManagerReducer } from "App/modals-manager/reducers"
import { contactSupportReducer } from "App/contact-support/reducers"
import { contactsReducer } from "App/contacts/reducers"
import { dataSyncReducer } from "App/data-sync/reducers"

export const reducers = {
  device: deviceReducer,
  backup: backupReducer,
  backupDevice: backupDeviceReducer,
  restoreDevice: restoreDeviceReducer,
  crashDump: crashDumpReducer,
  messages: messagesReducer,
  contacts: contactsReducer,
  dataSync: dataSyncReducer,
  modalsManager: modalsManagerReducer,
  contactSupport: contactSupportReducer,
}

export const combinedReducers = combineReducers(reducers)
