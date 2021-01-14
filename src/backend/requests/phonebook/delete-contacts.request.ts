import createEndpoint from "Backend/endpoints/create-endpoint"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import Adapters from "Backend/adapters/adapters.interface"
import { ContactID } from "App/contacts/store/phone.typings"
import DeviceResponse from "Backend/adapters/device-response.interface"

const handleDeleteContactsRequest = (
  { phonebook }: Adapters,
  contactIds: ContactID[]
): Promise<DeviceResponse<ContactID[]>> => {
  return phonebook.deleteContacts(contactIds)
}

const registerDeleteContactsRequest = createEndpoint({
  name: IpcRequest.DeleteContacts,
  handler: handleDeleteContactsRequest,
})

export default registerDeleteContactsRequest
