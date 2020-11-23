import getFakeAdapters from "App/tests/get-fake-adapters"
import { ipcMain } from "electron-better-ipc"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import { DeviceResponseStatus } from "Backend/adapters/device-response.interface"
import registerDeleteContactRequest from "Backend/requests/phonebook/delete-contact.request"

test("delete contacts properly", async () => {
  registerDeleteContactRequest(getFakeAdapters())
  const contactToDelete = "1"
  const [pendingResponse] = (ipcMain as any)._flush(
    IpcRequest.DeleteContact,
    contactToDelete
  )
  const result = await pendingResponse
  expect(result.data).toStrictEqual(contactToDelete)
  expect(result.status).toBe(DeviceResponseStatus.Ok)
})
