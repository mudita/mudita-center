import { ipcMain } from "electron-better-ipc"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import registerDeleteContactsRequest from "Backend/requests/phonebook/delete-contacts.request"
import createPhonebook from "Backend/adapters/phonebook/phonebook.adapter"
import MockPureNodeService from "Backend/mock-device-service"
import PureDeviceManager from "@mudita/pure"
import Adapters from "Backend/adapters/adapters.interface"
import { DeviceResponseStatus } from "Backend/adapters/device-response.interface"

const adapters = ({
  phonebook: createPhonebook(
    new MockPureNodeService(PureDeviceManager, ipcMain)
  ),
} as unknown) as Adapters

test("return response from correctly deleted contact", async () => {
  registerDeleteContactsRequest(adapters)
  const [result] = await (ipcMain as any)._flush(IpcRequest.DeleteContacts, [
    "1",
    "2",
    "4",
  ])
  const response = await result
  expect(response.status).toEqual(DeviceResponseStatus.Ok)
})
