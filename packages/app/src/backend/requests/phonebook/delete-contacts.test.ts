/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcMain } from "electron-better-ipc"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import registerDeleteContactsRequest from "Backend/requests/phonebook/delete-contacts.request"
import { Contact as PureContact } from "@mudita/pure"
import { DeviceResponseStatus } from "Backend/adapters/device-response.interface"
import DeviceService from "Backend/device-service"
import { getAdapters } from "Backend/requests/phonebook/phonebook-adapters"

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

jest.mock("Backend/device-service")

test("return response from correctly deleted contact", async () => {
  ;(DeviceService as jest.Mock).mockImplementation(() => {
    return {
      request: () => ({
        data: mockPureData[0].id,
        status: DeviceResponseStatus.Ok,
      }),
    }
  })
  registerDeleteContactsRequest(getAdapters())
  const [result] = await (ipcMain as any)._flush(IpcRequest.DeleteContacts, [
    "1",
    "2",
    "4",
  ])
  const response = await result
  expect(response.status).toEqual(DeviceResponseStatus.Ok)
})
