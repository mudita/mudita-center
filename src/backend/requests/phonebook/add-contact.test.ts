import { ipcMain } from "electron-better-ipc"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import registerAddContactRequest from "Backend/requests/phonebook/add-contact.request"
import { newContact, pureContactId } from "Backend/mock-device-service"
import { adapters } from "Backend/requests/phonebook/phonebook-adapters"

test("adds contact properly", async () => {
  registerAddContactRequest(adapters)

  const [pendingResponse] = await (ipcMain as any)._flush(
    IpcRequest.AddContact,
    newContact
  )
  const { data } = await pendingResponse

  expect(data.id).toEqual(String(pureContactId))
})
