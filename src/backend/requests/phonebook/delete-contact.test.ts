import { ipcMain } from "electron-better-ipc"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import registerDeleteContactRequest from "Backend/requests/phonebook/delete-contact.request"
import createPhonebook from "Backend/adapters/phonebook/phonebook.adapter"
import MockPureNodeService, { mockPureData } from "Backend/mock-device-service";
import PureDeviceManager from "pure"
import Adapters from "Backend/adapters/adapters.interface"

jest.mock("pure")

const adapters = ({
  phonebook: createPhonebook(
    new MockPureNodeService(PureDeviceManager, ipcMain)
  ),
} as unknown) as Adapters

test("return ", async () => {
  registerDeleteContactRequest(adapters)
  const [result] = await (ipcMain as any)._flush(IpcRequest.DeleteContact, mockPureData[0].id)

  const response = await result
  console.log(response)
  expect(response.data).toEqual(mockPureData[0].id)
})
