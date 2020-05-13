import createEndpoint from "Backend/endpoints/create-endpoint"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import Adapters from "Backend/adapters/adapters.interface"
import { Contact, NewContact } from "Renderer/models/phone/phone.interface"
import DeviceResponse from "Backend/adapters/device-response.interface"

const handleAddContactRequest = (
  { phonebook }: Adapters,
  contact: NewContact
): DeviceResponse<Contact> => {
  return phonebook.addContact(contact)
}

const registerAddContactRequest = createEndpoint({
  name: IpcRequest.AddContact,
  handler: handleAddContactRequest,
})

export default registerAddContactRequest
