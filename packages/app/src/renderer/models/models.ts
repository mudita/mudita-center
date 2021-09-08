/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import auth from "Renderer/models/auth/auth"
import basicInfo from "Renderer/models/basic-info/basic-info"
import calls from "Renderer/models/calls/calls"
import devMode from "App/dev-mode/store/dev-mode"
import filesManager from "Renderer/models/files-manager/files-manager"
import messages from "App/messages/store/messages"
import muditaNews from "App/news/store/mudita-news"
import networkStatus from "Renderer/models/network-status/network-status"
import notes from "Renderer/models/notes/notes"
import contacts from "App/contacts/store/contacts"
import phoneUpdate from "Renderer/models/phone-update/phone-update"
import settings from "Renderer/models/settings/settings"
import templates from "App/templates/store/templates"
import calendar from "App/calendar/store/calendar"

export interface RootModel {
  auth: typeof auth
  basicInfo: typeof basicInfo
  calls: typeof calls
  devMode: typeof devMode
  filesManager: typeof filesManager
  messages: typeof messages
  muditaNews: typeof muditaNews
  networkStatus: typeof networkStatus
  notes: typeof notes
  contacts: typeof contacts
  phoneUpdate: typeof phoneUpdate
  settings: typeof settings
  templates: typeof templates
  calendar: typeof calendar
}

export const models: RootModel = {
  auth,
  basicInfo,
  calls,
  devMode,
  filesManager,
  messages,
  muditaNews,
  networkStatus,
  notes,
  contacts,
  phoneUpdate,
  settings,
  templates,
  calendar,
}
