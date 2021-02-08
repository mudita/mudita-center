/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { ipcMain } from "electron-better-ipc"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import registerGetContactsRequest from "Backend/requests/phonebook/get-contacts.request"
import { contact } from "Backend/mock-device-service"
import { adapters } from "Backend/requests/phonebook/phonebook-adapters"

test("return mapped contacts from pure to Contact model", async () => {
  registerGetContactsRequest(adapters)

  const [pendingResponse] = await (ipcMain as any)._flush(
    IpcRequest.GetContacts
  )

  const { data = [] } = await pendingResponse
  expect(data[0]).toMatchObject(contact)
})
