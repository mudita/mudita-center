/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { combineReducers } from "redux"
import { deviceReducer } from "App/device/reducers"
import { crashDumpReducer } from "App/crash-dump/reducers"
import { backupReducer } from "App/backup/reducers"
import { messagesReducer } from "App/messages/reducers"
import { modalsManagerReducer } from "App/modals-manager/reducers"
import { contactSupportReducer } from "App/contact-support/reducers"
import { contactsReducer } from "App/contacts/reducers"
import { dataSyncReducer } from "App/data-sync/reducers"
import { filesManagerReducer } from "App/files-manager/reducers"
import { notificationReducer } from "App/notification/reducers"
import { templateReducer } from "App/templates/reducers"
import { newsReducer } from "App/news/reducers"
import { settingsReducer } from "App/settings/reducers"
import { updateOsReducer } from "App/update/reducers"

export const reducers = {
  device: deviceReducer,
  backup: backupReducer,
  crashDump: crashDumpReducer,
  messages: messagesReducer,
  contacts: contactsReducer,
  dataSync: dataSyncReducer,
  modalsManager: modalsManagerReducer,
  contactSupport: contactSupportReducer,
  filesManager: filesManagerReducer,
  notification: notificationReducer,
  templates: templateReducer,
  news: newsReducer,
  settings: settingsReducer,
  update: updateOsReducer,
}

export const combinedReducers = combineReducers(reducers)
