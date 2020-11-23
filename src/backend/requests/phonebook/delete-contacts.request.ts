import createEndpoint from "Backend/endpoints/create-endpoint"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import Adapters from "Backend/adapters/adapters.interface"
import { ContactID } from "Renderer/models/phone/phone.typings"
import DeviceResponse from "Backend/adapters/device-response.interface"

const handleDeleteContactsRequest = (
  { phonebook }: Adapters,
  contactId: ContactID
): Promise<DeviceResponse<ContactID>> => {
  return phonebook.deleteContact(contactId)
}

const registerDeleteContactsRequest = createEndpoint({
  name: IpcRequest.DeleteContact,
  handler: handleDeleteContactsRequest,
})

export default registerDeleteContactsRequest
