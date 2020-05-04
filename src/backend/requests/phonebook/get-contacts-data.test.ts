import registerGetContactsRequest from "Backend/requests/phonebook/get-contacts.request"
import getFakeAdapters from "App/tests/get-fake-adapters"
import { ipcMain } from "electron-better-ipc"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import { DeviceResponseStatus } from "Backend/adapters/device-response.interface"

test("returns contacts properly", () => {
  registerGetContactsRequest(getFakeAdapters())

  const [result] = (ipcMain as any)._flush(IpcRequest.GetContacts)
  expect(result.status).toBe(DeviceResponseStatus.Ok)
  expect(result.data).toHaveLength(100)
})
