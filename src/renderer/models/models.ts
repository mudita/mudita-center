import filesManager from "Renderer/models/files-manager/files-manager"
import messages from "Renderer/models/messages/messages"
import phone from "Renderer/models/phone/phone"
import basicInfo from "Renderer/models/basic-info/basic-info"
import phoneUpdate from "Renderer/models/phone-update/phone-update"
import muditaNews from "Renderer/models/mudita-news/mudita-news"
import networkStatus from "Renderer/models/network-status/network-status"
import muditaProductCards from "Renderer/models/mudita-product-cards/mudita-product-cards"

export interface RootModel {
  basicInfo: typeof basicInfo
  filesManager: typeof filesManager
  messages: typeof messages
  phone: typeof phone
  phoneUpdate: typeof phoneUpdate
  muditaNews: typeof muditaNews
  networkStatus: typeof networkStatus
  muditaProductCards: typeof muditaProductCards
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
}
