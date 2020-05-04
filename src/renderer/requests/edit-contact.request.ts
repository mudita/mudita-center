import { ipcRenderer } from "electron-better-ipc"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import { Contact } from "Renderer/models/phone/phone.interface"

const editContact = async (contact: Contact): Promise<Contact> => {
  const { data } = await ipcRenderer.callMain(IpcRequest.EditContact, contact)
  return data
}

export default editContact
