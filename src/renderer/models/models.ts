import filesManager from "Renderer/models/files-manager/files-manager"
import messages from "Renderer/models/messages/messages"
import phone from "Renderer/models/phone/phone"
import basicInfo from "Renderer/models/basic-info/basic-info"
import phoneUpdate from "Renderer/models/phone-update/phone-update"

export interface RootModel {
  basicInfo: typeof basicInfo
  filesManager: typeof filesManager
  messages: typeof messages
  phone: typeof phone
  phoneUpdate: typeof phoneUpdate
}

export const models: RootModel = {
  basicInfo,
  phone,
  messages,
  filesManager,
  phoneUpdate,
}
