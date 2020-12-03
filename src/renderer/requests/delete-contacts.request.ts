import { ipcRenderer } from "electron-better-ipc"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import { ContactID } from "Renderer/models/phone/phone.typings"
import DeviceResponse from "Backend/adapters/device-response.interface"

const deleteContacts = async (
  contactIds: ContactID[]
): Promise<DeviceResponse<ContactID[]>> => {
  return await ipcRenderer.callMain(IpcRequest.DeleteContacts, contactIds)
}

export default deleteContacts
