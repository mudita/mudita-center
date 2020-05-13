import getFakeAdapters from "App/tests/get-fake-adapters"
import { ipcMain } from "electron-better-ipc"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import { DeviceResponseStatus } from "Backend/adapters/device-response.interface"
import registerDeleteContactsRequest from "Backend/requests/phonebook/delete-contacts.request"

const contactsIdsToDelete = ["id1", "id2", "id3"]

test("delete contacts properly", () => {
  registerDeleteContactsRequest(getFakeAdapters())

  const [result] = (ipcMain as any)._flush(
    IpcRequest.DeleteContacts,
    contactsIdsToDelete
  )

  expect(result.data).toStrictEqual(contactsIdsToDelete)
  expect(result.status).toBe(DeviceResponseStatus.Ok)
})
