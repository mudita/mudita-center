/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import createEndpoint from "Backend/endpoints/create-endpoint"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import Adapters from "Backend/adapters/adapters.interface"
import { Contact } from "App/contacts/store/contacts.type"
import DeviceResponse from "Backend/adapters/device-response.interface"

const handleEditContactRequest = (
  { phonebook }: Adapters,
  contact: Contact
): Promise<DeviceResponse<Contact>> => {
  return phonebook.editContact(contact)
}

const registerEditContactRequest = createEndpoint({
  name: IpcRequest.EditContact,
  handler: handleEditContactRequest,
})

export default registerEditContactRequest
