/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AnyAction } from "@reduxjs/toolkit"
import thunk from "redux-thunk"
import createMockStore from "redux-mock-store"
import { ContactsEvent } from "App/contacts/constants"
import { AddNewContactError } from "App/contacts/errors/add-new-contact.error"
import addContact from "Renderer/requests/add-contact.request"
import { Contact, initialState, NewContact } from "App/contacts/reducers"
import { testError } from "Renderer/store/constants"
import DeviceResponse, {
  DeviceResponseStatus,
} from "Backend/adapters/device-response.interface"
import { addNewContact } from "App/contacts/actions/add-new-contact.action"

jest.mock("Renderer/requests/add-contact.request")

const newContact: NewContact = {
  firstName: "Sławomir",
  lastName: "Borewicz",
  primaryPhoneNumber: "+71195069214",
  secondaryPhoneNumber: "",
  email: "example@mudita.com",
  note: "sapiente rem dignissimos sunt",
  ice: false,
  favourite: false,
  blocked: false,
  firstAddressLine: "Malczewskiego 3, Warszawa",
  secondAddressLine: "",
}

const contact: Contact = {
  id: "0",
  ...newContact,
} as Contact

const successDeviceResponse: DeviceResponse<Contact> = {
  status: DeviceResponseStatus.Ok,
  data: contact,
}

const errorDeviceResponse: DeviceResponse = {
  status: DeviceResponseStatus.Error,
  error: {
    message: "I'm error",
  },
}

afterEach(() => {
  jest.resetAllMocks()
})

describe("async `addNewContact` ", () => {
  describe("when `addContact` request return success", () => {
    test("fire async `addNewContact` call `addNewContactToState`", async () => {
      ;(addContact as jest.Mock).mockReturnValue(successDeviceResponse)
      const mockStore = createMockStore([thunk])({
        contacts: initialState,
      })
      const {
        meta: { requestId },
      } = await mockStore.dispatch(
        addNewContact(newContact) as unknown as AnyAction
      )

      expect(mockStore.getActions()).toEqual([
        addNewContact.pending(requestId, newContact),
        {
          type: ContactsEvent.AddNewContactToState,
          payload: contact,
        },
        addNewContact.fulfilled(undefined, requestId, newContact),
      ])

      expect(addContact).toHaveBeenCalled()
    })
  })

  describe("when `addContact` request return error", () => {
    test("fire async `addNewContact` returns `rejected` action", async () => {
      ;(addContact as jest.Mock).mockReturnValue(errorDeviceResponse)
      const errorMock = new AddNewContactError("Add Contact request failed")
      const mockStore = createMockStore([thunk])({
        contacts: initialState,
      })
      const {
        meta: { requestId },
      } = await mockStore.dispatch(
        addNewContact(newContact) as unknown as AnyAction
      )

      expect(mockStore.getActions()).toEqual([
        addNewContact.pending(requestId, newContact),
        addNewContact.rejected(testError, requestId, newContact, errorMock),
      ])

      expect(addContact).toHaveBeenCalled()
    })
  })
})
