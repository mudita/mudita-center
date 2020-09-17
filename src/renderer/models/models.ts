import auth from "Renderer/models/auth/auth"
import basicInfo from "Renderer/models/basic-info/basic-info"
import calls from "Renderer/models/calls/calls"
import devMode from "Renderer/models/dev-mode/dev-mode"
import filesManager from "Renderer/models/files-manager/files-manager"
import messages from "Renderer/models/messages/messages"
import muditaNews from "Renderer/models/mudita-news/mudita-news"
import muditaProductCards from "Renderer/models/mudita-product-cards/mudita-product-cards"
import networkStatus from "Renderer/models/network-status/network-status"
import notes from "Renderer/models/notes/notes"
import phone from "Renderer/models/phone/phone"
import phoneUpdate from "Renderer/models/phone-update/phone-update"
import settings from "Renderer/models/settings/settings"
import templates from "Renderer/models/templates/templates"

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
  phone: typeof phone
  phoneUpdate: typeof phoneUpdate
  settings: typeof settings
  templates: typeof templates
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
  phone,
  phoneUpdate,
  settings,
  templates,
}
