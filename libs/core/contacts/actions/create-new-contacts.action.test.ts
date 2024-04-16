/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AnyAction } from "@reduxjs/toolkit"
import { createNewContact } from "Core/contacts/actions/create-new-contacts.action"
import { ContactsEvent } from "Core/contacts/constants"
import { Contact, initialState, NewContact } from "Core/contacts/reducers"
import { createContactRequest } from "Core/contacts/requests"
import { AppError } from "Core/core/errors"
import {
  RequestResponse,
  RequestResponseStatus,
} from "Core/core/types/request-response.interface"
import { testError } from "Core/__deprecated__/renderer/store/constants"
import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"

jest.mock("Core/contacts/requests/create-contact.request")

const newContact: NewContact = {
  firstName: "Sławomir",
  lastName: "Borewicz",
  primaryPhoneNumber: "+71195069214",
  secondaryPhoneNumber: "",
  email: "example@mudita.com",
  note: "sapiente rem dignissimos sunt",
  ice: false,
  favourite: false,
  firstAddressLine: "Malczewskiego 3, Warszawa",
  secondAddressLine: "",
}

const contact: Contact = {
  id: "0",
  ...newContact,
} as Contact

const successDeviceResponse: RequestResponse<Contact> = {
  status: RequestResponseStatus.Ok,
  data: contact,
}

const errorDeviceResponse: RequestResponse = {
  status: RequestResponseStatus.Error,
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
      ;(createContactRequest as jest.Mock).mockReturnValue(
        successDeviceResponse
      )
      const mockStore = createMockStore([thunk])({
        contacts: initialState,
      })
      const {
        meta: { requestId },
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/await-thenable
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
      const errorMock = new AppError(ContactsEvent.AddNewContact, "I'm error")
      const mockStore = createMockStore([thunk])({
        contacts: initialState,
      })
      const {
        meta: { requestId },
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/await-thenable
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
