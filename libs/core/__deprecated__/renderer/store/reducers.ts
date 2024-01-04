/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { combineReducers } from "redux"
import { deviceReducer } from "Core/device/reducers"
import { crashDumpReducer } from "Core/crash-dump/reducers"
import { backupReducer } from "Core/backup/reducers"
import { messagesReducer } from "Core/messages/reducers"
import { modalsManagerReducer } from "Core/modals-manager/reducers"
import { contactSupportReducer } from "Core/contact-support/reducers"
import { contactsReducer } from "Core/contacts/reducers"
import { dataSyncReducer } from "Core/data-sync/reducers"
import { filesManagerReducer } from "Core/files-manager/reducers"
import { notificationReducer } from "Core/notification/reducers"
import { templateReducer } from "Core/templates/reducers"
import { newsReducer } from "Core/news/reducers"
import { settingsReducer } from "Core/settings/reducers"
import { updateOsReducer } from "Core/update/reducers"
import { genericViewsReducer } from "generic-view/store"

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
  genericViews: genericViewsReducer,
}

export const combinedReducers = combineReducers(reducers)
