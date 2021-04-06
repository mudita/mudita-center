/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcMain } from "electron-better-ipc"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import registerEditContactRequest from "Backend/requests/phonebook/edit-contact.request"
import { getAdapters } from "Backend/requests/phonebook/phonebook-adapters"
import { Contact } from "App/contacts/store/contacts.type"
import DeviceService from "Backend/device-service"
import { DeviceResponseStatus } from "Backend/adapters/device-response.interface"

const pureContactId = "19"

const contact: Contact = {
  firstName: "Alek",
  lastName: "Boligłowa",
  primaryPhoneNumber: "500400300",
  secondaryPhoneNumber: "",
  email: "",
  note: "",
  firstAddressLine: "6 Czeczota St.",
  secondAddressLine: "02600 Warsaw",
  favourite: true,
  blocked: false,
  ice: false,
  id: pureContactId,
} as Contact

jest.mock("Backend/device-service")

test("edit contact properly", async () => {
  ;(DeviceService as jest.Mock).mockImplementation(() => {
    return {
      request: () => ({
        data: { id: pureContactId },
        status: DeviceResponseStatus.Ok,
      }),
    }
  })
  registerEditContactRequest(getAdapters())

  const [pendingResponse] = await (ipcMain as any)._flush(
    IpcRequest.EditContact,
    contact
  )
  const { data } = await pendingResponse

  expect(data).toMatchObject(contact)
})
