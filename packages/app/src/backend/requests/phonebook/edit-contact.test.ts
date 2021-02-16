/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { ipcMain } from "electron-better-ipc"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import registerEditContactRequest from "Backend/requests/phonebook/edit-contact.request"
import { adapters } from "Backend/requests/phonebook/phonebook-adapters"
import { contact } from "Backend/mock-device-service"

test("edit contact properly", async () => {
  registerEditContactRequest(adapters)

  const [pendingResponse] = await (ipcMain as any)._flush(
    IpcRequest.EditContact,
    contact
  )
  const { data } = await pendingResponse

  expect(data).toMatchObject(contact)
})
