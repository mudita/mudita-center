import filesManager from "Renderer/models/files-manager/files-manager"
import messages from "Renderer/models/messages/messages"
import phone from "Renderer/models/phone/phone"
import basicInfo from "Renderer/models/basic-info/basic-info"

export interface RootModel {
  basicInfo: typeof basicInfo
  filesManager: typeof filesManager
  messages: typeof messages
  phone: typeof phone
}

export const models: RootModel = {
  basicInfo,
  phone,
  messages,
  filesManager,
}
