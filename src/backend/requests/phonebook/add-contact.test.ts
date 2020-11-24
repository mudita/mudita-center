import { ipcMain } from "electron-better-ipc"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import registerAddContactRequest from "Backend/requests/phonebook/add-contact.request"
import { contact, newContact, pureContactId } from "Backend/mock-device-service"
import { Contact } from "Renderer/models/phone/phone.typings"
import { adapters } from "Backend/requests/phonebook/phonebook-adapters"

jest.mock("pure")

test("adds contact properly", async () => {
  registerAddContactRequest(adapters)

  const [pendingResponse] = await (ipcMain as any)._flush(
    IpcRequest.AddContact,
    newContact
  )
  const { data } = await pendingResponse

  // TODO: remove this conditional after EGD fix, task https://appnroll.atlassian.net/browse/PDA-572
  expect({ ...data, id: String(pureContactId) } as Contact).toMatchObject(
    contact
  )
})
