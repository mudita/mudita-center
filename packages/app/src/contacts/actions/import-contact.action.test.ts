/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AnyAction } from "@reduxjs/toolkit"
import { importContact } from "App/contacts/actions/import-contact.action"
import { ContactsEvent } from "App/contacts/constants"
import { Contact, initialState, NewContact } from "App/contacts/reducers"
import { createContactRequest, editContactRequest } from "App/contacts/requests"
import { AppError } from "App/core/errors"
import {
  RequestResponse,
  RequestResponseStatus,
} from "App/core/types/request-response.interface"
import { testError } from "App/__deprecated__/renderer/store/constants"
import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"

jest.mock("App/contacts/requests/create-contact.request")
jest.mock("App/contacts/requests/edit-contact.request")

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

const duplicatedErrorDeviceResponse: RequestResponse = {
  status: RequestResponseStatus.Duplicated,
  error: {
    message: "I'm error",
    data: {
      id: "0",
    },
  },
}

afterEach(() => {
  jest.resetAllMocks()
})

describe("async `importContact` ", () => {
  describe("when `addContact` request return success", () => {
    test("fire async `importContact` no made any side effects", async () => {
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
        importContact(newContact) as unknown as AnyAction
      )

      expect(mockStore.getActions()).toEqual([
        importContact.pending(requestId, newContact),
        importContact.fulfilled(
          successDeviceResponse.data as Contact,
          requestId,
          newContact
        ),
      ])

      expect(createContactRequest).toHaveBeenCalled()
    })
  })

  describe("when `addContact` request return error", () => {
    test("fire async `importContact` returns `rejected` action", async () => {
      ;(createContactRequest as jest.Mock).mockReturnValue(errorDeviceResponse)
      const errorMock = new AppError(
        ContactsEvent.ImportContact,
        "Import Contact request failed"
      )
      const mockStore = createMockStore([thunk])({
        contacts: initialState,
      })
      const {
        meta: { requestId },
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/await-thenable
      } = await mockStore.dispatch(
        importContact(newContact) as unknown as AnyAction
      )

      expect(mockStore.getActions()).toEqual([
        importContact.pending(requestId, newContact),
        importContact.rejected(testError, requestId, newContact, errorMock),
      ])

      expect(createContactRequest).toHaveBeenCalled()
    })
  })

  describe("when `addContact` request return duplicated error", () => {
    test("fire async `importContact` call `editContact` request", async () => {
      ;(createContactRequest as jest.Mock).mockReturnValue(
        duplicatedErrorDeviceResponse
      )
      ;(editContactRequest as jest.Mock).mockReturnValue(
        duplicatedErrorDeviceResponse
      )
      const mockStore = createMockStore([thunk])({
        contacts: initialState,
      })
      const {
        meta: { requestId },
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/await-thenable
      } = await mockStore.dispatch(
        importContact(newContact) as unknown as AnyAction
      )

      expect(mockStore.getActions()).toEqual([
        importContact.pending(requestId, newContact),
        importContact.fulfilled(
          {
            ...newContact,
            // AUTO DISABLED - fix me if you like :)
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-non-null-assertion
            id: duplicatedErrorDeviceResponse.error!.data.id,
          } as Contact,
          requestId,
          newContact
        ),
      ])

      expect(createContactRequest).toHaveBeenCalled()
      expect(editContactRequest).toHaveBeenCalled()
    })
  })
})
