import filesManager from "Renderer/models/files-manager/files-manager"
import messages from "Renderer/models/messages/messages"
import phone from "Renderer/models/phone/phone"
import basicInfo from "Renderer/models/basic-info/basic-info"
import phoneUpdate from "Renderer/models/phone-update/phone-update"
import muditaNews from "Renderer/models/mudita-news/mudita-news"
import networkStatus from "Renderer/models/network-status/network-status"
import muditaProductCards from "Renderer/models/mudita-product-cards/mudita-product-cards"
import settings from "Renderer/models/settings/settings"
import backupSettings from "Renderer/models/backup-settings/backup-settings"
import calls from "Renderer/models/calls/calls"
import devMode from "Renderer/models/dev-mode/dev-mode"
import templates from "Renderer/models/templates/templates"
import notes from "Renderer/models/notes/notes"

export interface RootModel {
  basicInfo: typeof basicInfo
  filesManager: typeof filesManager
  messages: typeof messages
  phone: typeof phone
  phoneUpdate: typeof phoneUpdate
  muditaNews: typeof muditaNews
  networkStatus: typeof networkStatus
  muditaProductCards: typeof muditaProductCards
  settings: typeof settings
  backupSettings: typeof backupSettings
  calls: typeof calls
  devMode: typeof devMode
  templates: typeof templates
  notes: typeof notes
}

export const models: RootModel = {
  basicInfo,
  phone,
  messages,
  filesManager,
  phoneUpdate,
  muditaNews,
  networkStatus,
  muditaProductCards,
  settings,
  backupSettings,
  calls,
  devMode,
  templates,
  notes,
}
