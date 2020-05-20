import { ipcRenderer } from "electron-better-ipc"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import { ContactUid } from "Renderer/models/phone/phone.interface"

const deleteContacts = async (
  contactsIds: ContactUid[]
): Promise<ContactUid[]> => {
  const { data } = await ipcRenderer.callMain(
    IpcRequest.DeleteContacts,
    contactsIds
  )
  return data
}

export default deleteContacts
