import { ipcRenderer } from "electron-better-ipc"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import { Contact } from "Renderer/models/phone/phone.typings"
import { NewContact } from "Renderer/models/phone/phone.typings"
import DeviceResponse from "Backend/adapters/device-response.interface"

const addContact = async (
  contact: NewContact
): Promise<DeviceResponse<Contact>> => {
  return ipcRenderer.callMain(IpcRequest.AddContact, contact)
}

export default addContact
