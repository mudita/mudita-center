/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Faker from "faker"
import { Phonebook } from "Backend/adapters/phonebook/phonebook.adapter"
import { Contact } from "App/contacts/store/contacts.type"
import DeviceService from "Backend/device-service"
import { DeviceResponseStatus } from "Backend/adapters/device-response.interface"
import { ipcMain } from "electron-better-ipc"
import PureDeviceManager from "@mudita/pure"

const deviceService = new DeviceService(PureDeviceManager, ipcMain)
const phonebookAdapter = new Phonebook(deviceService)

const contactMock: Contact = {
  id: Faker.datatype.uuid(),
  firstName: "Luke",
  lastName: "Skywalker",
  primaryPhoneNumber: "123123123",
  secondaryPhoneNumber: "123123123",
}

test("returns the Duplicated response status", async () => {
  jest.spyOn(deviceService, "request").mockResolvedValueOnce({
    status: DeviceResponseStatus.Duplicated,
    error: {
      code: 409,
      message: "This is error",
    },
  })

  expect(await phonebookAdapter.addContact(contactMock)).toEqual({
    status: "phone-number-duplicated",
    error: { message: "Add contact: Something went wrong" },
  })
})
