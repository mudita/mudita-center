import auth from "Renderer/models/auth/auth"
import basicInfo from "Renderer/models/basic-info/basic-info"
import calls from "Renderer/models/calls/calls"
import devMode from "App/dev-mode/store/dev-mode"
import filesManager from "Renderer/models/files-manager/files-manager"
import messages from "Renderer/models/messages/messages"
import muditaNews from "Renderer/models/mudita-news/mudita-news"
import muditaProductCards from "Renderer/models/mudita-product-cards/mudita-product-cards"
import networkStatus from "Renderer/models/network-status/network-status"
import notes from "Renderer/models/notes/notes"
import contacts from "App/contacts/store/contacts"
import phoneUpdate from "Renderer/models/phone-update/phone-update"
import settings from "Renderer/models/settings/settings"
import templates from "Renderer/models/templates/templates"
import calendar from "Renderer/models/calendar/calendar"

export interface RootModel {
  auth: typeof auth
  basicInfo: typeof basicInfo
  calls: typeof calls
  devMode: typeof devMode
  filesManager: typeof filesManager
  messages: typeof messages
  muditaNews: typeof muditaNews
  muditaProductCards: typeof muditaProductCards
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
  muditaProductCards,
  networkStatus,
  notes,
  contacts,
  phoneUpdate,
  settings,
  templates,
  calendar,
}
