/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcMain } from "electron-better-ipc"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import registerGetContactsRequest from "Backend/requests/phonebook/get-contacts.request"
import { getAdapters } from "Backend/requests/phonebook/phonebook-adapters"
import { DeviceResponseStatus } from "Backend/adapters/device-response.interface"
import { Contact as PureContact } from "@mudita/pure"
import { Contact } from "App/contacts/store/contacts.type"
import DeviceService from "Backend/device-service"

const pureContactId = "19"

const mockPureData: PureContact[] = [
  {
    address: "6 Czeczota St.\n02600 Warsaw",
    altName: "Boligłowa",
    blocked: false,
    favourite: true,
    id: Number(pureContactId),
    numbers: ["500400300"],
    priName: "Alek",
  },
]

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

test("return mapped contacts from pure to Contact model", async () => {
  ;(DeviceService as jest.Mock).mockImplementation(() => {
    return {
      request: () => {
        return {
          data: { entries: mockPureData, totalCount: mockPureData.length },
          status: DeviceResponseStatus.Ok,
        }
      },
    }
  })
  registerGetContactsRequest(getAdapters())

  const [pendingResponse] = await (ipcMain as any)._flush(
    IpcRequest.GetContacts
  )

  const { data = [] } = await pendingResponse
  expect(data[0]).toMatchObject(contact)
})
