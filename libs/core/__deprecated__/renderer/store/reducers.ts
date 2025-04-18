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
import { discoveryDeviceReducer } from "Core/discovery-device/reducers/discovery-device.reducer"
import { deviceInitializationReducer } from "Core/device-initialization/reducers/device-initialization.reducer"
import { appInitializationReducer } from "Core/app-initialization/reducers/app-initialization.reducer"
import { coreDeviceReducer } from "core-device/feature"
import { deviceManagerReducer } from "device-manager/feature"
import {
  dataMigrationReducer,
  genericBackupsReducer,
  genericDataTransferReducer,
  genericFileTransferReducer,
  genericModalsReducer,
  genericViewsReducer,
  importsReducer,
  externalProvidersReducer,
  genericEntitiesReducer,
  genericToastsReducer,
  genericAppInstallationReducer,
  mtpFileTransferReducer,
} from "generic-view/store"
import { appStateReducer } from "shared/app-state"
import { activeDeviceRegistryReducer } from "active-device-registry/feature"
import { helpReducer } from "help/store"
import { timeSynchronizationReducer } from "Core/time-synchronization/reducers/time-synchronization.reducer"
import { flashingReducer } from "msc-flash-harmony"

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
  timeSynchronization: timeSynchronizationReducer,
  discoveryDevice: discoveryDeviceReducer,
  deviceInitialization: deviceInitializationReducer,
  appInitialization: appInitializationReducer,
  coreDevice: coreDeviceReducer,
  deviceManager: deviceManagerReducer,
  activeDeviceRegistry: activeDeviceRegistryReducer,
  genericViews: genericViewsReducer,
  genericModals: genericModalsReducer,
  genericBackups: genericBackupsReducer,
  genericFileTransfer: genericFileTransferReducer,
  genericImport: importsReducer,
  externalProviders: externalProvidersReducer,
  appState: appStateReducer,
  dataMigration: dataMigrationReducer,
  genericDataTransfer: genericDataTransferReducer,
  helpV2: helpReducer,
  flashing: flashingReducer,
  genericEntities: genericEntitiesReducer,
  genericToasts: genericToastsReducer,
  genericAppInstallation: genericAppInstallationReducer,
  mtpFileTransfer: mtpFileTransferReducer,
}

export const combinedReducers = combineReducers(reducers)
