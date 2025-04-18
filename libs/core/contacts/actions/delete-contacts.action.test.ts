/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AnyAction } from "@reduxjs/toolkit"
import { deleteContacts } from "Core/contacts/actions/delete-contacts.action"
import { ContactsEvent } from "Core/contacts/constants"
import { Contact, initialState } from "Core/contacts/reducers"
import { deleteContactsRequest } from "Core/contacts/requests"
import { AppError } from "Core/core/errors"
import {
  RequestResponse,
  RequestResponseStatus,
} from "Core/core/types/request-response.interface"
import { testError } from "Core/__deprecated__/renderer/store/constants"
import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"

jest.mock("Core/contacts/requests/delete-contacts.request")
jest.mock("device/feature/src/lib/file-manager/mtp-file-manager.service")

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

const errorDeviceWithExceptionsResponse: RequestResponse = {
  status: RequestResponseStatus.Error,
  error: {
    message: "I'm error",
    data: [contact.id],
  },
}

afterEach(() => {
  jest.resetAllMocks()
})

describe("async `deleteContacts` ", () => {
  describe("when `deleteContactsRequest` request return success", () => {
    test("fire async `deleteContacts` call `deleteContactsInState`", async () => {
      ;(deleteContactsRequest as jest.Mock).mockReturnValue(
        successDeviceResponse
      )
      const mockStore = createMockStore([thunk])({
        contacts: initialState,
        activeDeviceRegistry: {
          activeDeviceId: "",
        },
      })
      const {
        meta: { requestId },
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/await-thenable
      } = await mockStore.dispatch(
        deleteContacts([contact.id]) as unknown as AnyAction
      )

      expect(mockStore.getActions()).toEqual([
        deleteContacts.pending(requestId, [contact.id]),
        {
          type: ContactsEvent.DeleteContactsInState,
          payload: [contact.id],
        },
        deleteContacts.fulfilled(undefined, requestId, [contact.id]),
      ])

      expect(deleteContactsRequest).toHaveBeenCalled()
    })
  })

  describe("when `deleteContactsRequest` request return error", () => {
    test("fire async `deleteContacts` returns `rejected` action", async () => {
      ;(deleteContactsRequest as jest.Mock).mockReturnValue(errorDeviceResponse)
      const errorMock = new AppError(
        ContactsEvent.DeleteContacts,
        "Delete Contacts request failed"
      )
      const mockStore = createMockStore([thunk])({
        contacts: initialState,
        activeDeviceRegistry: {
          activeDeviceId: "",
        },
      })
      const {
        meta: { requestId },
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/await-thenable
      } = await mockStore.dispatch(
        deleteContacts([contact.id]) as unknown as AnyAction
      )

      expect(mockStore.getActions()).toEqual([
        deleteContacts.pending(requestId, [contact.id]),
        deleteContacts.rejected(testError, requestId, [contact.id], errorMock),
      ])

      expect(deleteContactsRequest).toHaveBeenCalled()
    })
  })

  describe("when `deleteContactsRequest` request return error with exceptions", () => {
    test("fire async `deleteContacts` call `deleteContactsInState`", async () => {
      ;(deleteContactsRequest as jest.Mock).mockReturnValue(
        errorDeviceWithExceptionsResponse
      )
      const mockStore = createMockStore([thunk])({
        contacts: initialState,
        activeDeviceRegistry: {
          activeDeviceId: "",
        },
      })
      const {
        meta: { requestId },
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/await-thenable
      } = await mockStore.dispatch(
        deleteContacts([contact.id]) as unknown as AnyAction
      )

      expect(mockStore.getActions()).toEqual([
        deleteContacts.pending(requestId, [contact.id]),
        {
          type: ContactsEvent.DeleteContactsInState,
          payload: [contact.id],
        },
        deleteContacts.fulfilled(undefined, requestId, [contact.id]),
      ])

      expect(deleteContactsRequest).toHaveBeenCalled()
    })
  })
})
