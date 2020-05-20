import { ipcRenderer } from "electron-better-ipc"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import { Contact, NewContact } from "Renderer/models/phone/phone.interface"

const addContact = async (contact: NewContact): Promise<Contact> => {
  const { data } = await ipcRenderer.callMain(IpcRequest.AddContact, contact)
  return data
}

export default addContact
