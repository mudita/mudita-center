import getFakeAdapters from "App/tests/get-fake-adapters"
import { ipcMain } from "electron-better-ipc"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import { DeviceResponseStatus } from "Backend/adapters/device-response.interface"
import registerEditContactRequest from "Backend/requests/phonebook/edit-contact.request"
import { generateFakeContact } from "Renderer/models/phone/phone.utils"

const fakeContact = generateFakeContact()

test("edit contact properly", () => {
  registerEditContactRequest(getFakeAdapters())

  const [result] = (ipcMain as any)._flush(IpcRequest.EditContact, fakeContact)

  expect(result.data).toStrictEqual(fakeContact)
  expect(result.status).toBe(DeviceResponseStatus.Ok)
})
