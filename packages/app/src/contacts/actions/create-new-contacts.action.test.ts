/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AnyAction } from "@reduxjs/toolkit"
import thunk from "redux-thunk"
import createMockStore from "redux-mock-store"
import { ContactsEvent } from "App/contacts/constants"
import { AddNewContactError } from "App/contacts/errors/add-new-contact.error"
import createContactRequest from "App/contacts/requests/create-contact.request"
import { Contact, initialState, NewContact } from "App/contacts/reducers"
import { testError } from "Renderer/store/constants"
import DeviceResponse, {
  DeviceResponseStatus,
} from "Backend/adapters/device-response.interface"
import { createNewContact } from "App/contacts/actions/create-new-contacts.action"

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

describe("async `createNewContact` ", () => {
  describe("when `createContactRequest` return success", () => {
    test("fire async `createNewContact` call `createNewContactToState`", async () => {
      ;(createContactRequest as jest.Mock).mockReturnValue(successDeviceResponse)
      const mockStore = createMockStore([thunk])({
        contacts: initialState,
      })
      const {
        meta: { requestId },
      } = await mockStore.dispatch(
        createNewContact(newContact) as unknown as AnyAction
      )

      expect(mockStore.getActions()).toEqual([
        createNewContact.pending(requestId, newContact),
        {
          type: ContactsEvent.AddNewContactsToState,
          payload: [contact],
        },
        createNewContact.fulfilled(undefined, requestId, newContact),
      ])

      expect(createContactRequest).toHaveBeenCalled()
    })
  })

  describe("when `createContactRequest` return error", () => {
    test("fire async `createNewContact` returns `rejected` action", async () => {
      ;(createContactRequest as jest.Mock).mockReturnValue(errorDeviceResponse)
      const errorMock = new AddNewContactError("Add Contact request failed")
      const mockStore = createMockStore([thunk])({
        contacts: initialState,
      })
      const {
        meta: { requestId },
      } = await mockStore.dispatch(
        createNewContact(newContact) as unknown as AnyAction
      )

      expect(mockStore.getActions()).toEqual([
        createNewContact.pending(requestId, newContact),
        createNewContact.rejected(testError, requestId, newContact, errorMock),
      ])

      expect(createContactRequest).toHaveBeenCalled()
    })
  })
})
