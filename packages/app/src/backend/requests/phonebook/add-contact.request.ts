import createEndpoint from "Backend/endpoints/create-endpoint"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import Adapters from "Backend/adapters/adapters.interface"
import { Contact, NewContact } from "App/contacts/store/contacts.type"
import DeviceResponse from "Backend/adapters/device-response.interface"

const handleAddContactRequest = (
  { phonebook }: Adapters,
  contact: NewContact
): Promise<DeviceResponse<Contact>> => phonebook.addContact(contact)

const registerAddContactRequest = createEndpoint({
  name: IpcRequest.AddContact,
  handler: handleAddContactRequest,
})

export default registerAddContactRequest
