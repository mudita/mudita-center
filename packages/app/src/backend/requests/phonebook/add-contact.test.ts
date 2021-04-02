/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcMain } from "electron-better-ipc"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import registerAddContactRequest from "Backend/requests/phonebook/add-contact.request"
import { getAdapters } from "Backend/requests/phonebook/phonebook-adapters"
import { NewContact } from "App/contacts/store/contacts.type"
import DeviceService from "Backend/device-service"
import { DeviceResponseStatus } from "Backend/adapters/device-response.interface"

const pureContactId = "19"

const newContact: NewContact = {
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
}

jest.mock("Backend/device-service")

test("adds contact properly", async () => {
  ;(DeviceService as jest.Mock).mockImplementation(() => {
    return {
      request: () => ({
        data: { id: pureContactId },
        status: DeviceResponseStatus.Ok,
      }),
    }
  })
  registerAddContactRequest(getAdapters())

  const [pendingResponse] = await (ipcMain as any)._flush(
    IpcRequest.AddContact,
    newContact
  )
  const { data } = await pendingResponse

  expect(data.id).toEqual(pureContactId)
})
