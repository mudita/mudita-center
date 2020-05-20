import { ipcRenderer } from "electron-better-ipc"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import { Contact } from "Renderer/models/phone/phone.interface"

const getContacts = async (): Promise<Contact[]> => {
  const { data } = await ipcRenderer.callMain(IpcRequest.GetContacts)
  return data || []
}

export default getContacts
