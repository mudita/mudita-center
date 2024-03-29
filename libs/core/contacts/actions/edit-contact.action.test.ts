/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AnyAction } from "@reduxjs/toolkit"
import { editContact } from "Core/contacts/actions/edit-contact.action"
import { ContactsEvent } from "Core/contacts/constants"
import { Contact, initialState } from "Core/contacts/reducers"
import { editContactRequest } from "Core/contacts/requests"
import { AppError } from "Core/core/errors"
import {
  RequestResponse,
  RequestResponseStatus,
} from "Core/core/types/request-response.interface"
import { testError } from "Core/__deprecated__/renderer/store/constants"
import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"

jest.mock("Core/contacts/requests/edit-contact.request")

const contact: Contact = {
  id: "0",
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

describe("async `editContact` ", () => {
  describe("when `editContactRequest` request return success", () => {
    test("fire async `editContact` call `editContactInState`", async () => {
      ;(editContactRequest as jest.Mock).mockReturnValue(successDeviceResponse)
      const mockStore = createMockStore([thunk])({
        contacts: initialState,
      })
      const {
        meta: { requestId },
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/await-thenable
      } = await mockStore.dispatch(editContact(contact) as unknown as AnyAction)

      expect(mockStore.getActions()).toEqual([
        editContact.pending(requestId, contact),
        {
          type: ContactsEvent.EditContactInState,
          payload: contact,
        },
        editContact.fulfilled(undefined, requestId, contact),
      ])

      expect(editContactRequest).toHaveBeenCalled()
    })
  })

  describe("when `editContactRequest` request return error", () => {
    test("fire async `editContact` returns `rejected` action", async () => {
      ;(editContactRequest as jest.Mock).mockReturnValue(errorDeviceResponse)
      const errorMock = new AppError(ContactsEvent.EditContact, "Edit Contact request failed")
      const mockStore = createMockStore([thunk])({
        contacts: initialState,
      })
      const {
        meta: { requestId },
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/await-thenable
      } = await mockStore.dispatch(editContact(contact) as unknown as AnyAction)

      expect(mockStore.getActions()).toEqual([
        editContact.pending(requestId, contact),
        editContact.rejected(testError, requestId, contact, errorMock),
      ])

      expect(editContactRequest).toHaveBeenCalled()
    })
  })
})
