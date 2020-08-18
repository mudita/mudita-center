import { ipcRenderer } from "electron-better-ipc"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import { ContactID } from "Renderer/models/phone/phone.typings"

const deleteContacts = async (
  contactsIds: ContactID[]
): Promise<ContactID[]> => {
  const { data } = await ipcRenderer.callMain(
    IpcRequest.DeleteContacts,
    contactsIds
  )
  return data
}

export default deleteContacts
