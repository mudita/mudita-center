import { ipcRenderer } from "electron-better-ipc"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import { Contact, NewContact } from "App/contacts/store/contacts.type"
import DeviceResponse from "Backend/adapters/device-response.interface"

const addContact = async (
  contact: NewContact
): Promise<DeviceResponse<Contact>> => {
  return ipcRenderer.callMain(IpcRequest.AddContact, contact)
}

export default addContact
