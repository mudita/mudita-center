import createEndpoint from "Backend/endpoints/create-endpoint"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import Adapters from "Backend/adapters/adapters.interface"
import { ContactUid } from "Renderer/models/phone/phone.interface"
import DeviceResponse from "Backend/adapters/device-response.interface"

const handleDeleteContactsRequest = (
  { phonebook }: Adapters,
  contactsIds: ContactUid[]
): DeviceResponse<ContactUid[]> => {
  return phonebook.deleteContacts(contactsIds)
}

const registerDeleteContactsRequest = createEndpoint({
  name: IpcRequest.DeleteContacts,
  handler: handleDeleteContactsRequest,
})

export default registerDeleteContactsRequest
