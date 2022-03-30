/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AnyAction } from "@reduxjs/toolkit"
import thunk from "redux-thunk"
import createMockStore from "redux-mock-store"
import { ContactsEvent } from "App/contacts/constants"
import { Contact, initialState } from "App/contacts/reducers"
import { testError } from "Renderer/store/constants"
import DeviceResponse, {
  DeviceResponseStatus,
} from "Backend/adapters/device-response.interface"
import { DeleteContactsError } from "App/contacts/errors/delete-contacts.error"
import deleteContactsRequest from "App/contacts/requests/delete-contacts.request"
import { deleteContacts } from "App/contacts/actions/delete-contacts.action"

jest.mock("App/contacts/requests/delete-contacts.request")

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
  blocked: false,
  firstAddressLine: "Malczewskiego 3, Warszawa",
  secondAddressLine: "",
}

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

const errorDeviceWithExceptionsResponse: DeviceResponse = {
  status: DeviceResponseStatus.Error,
  error: {
    message: "I'm error",
    data: [contact.id]
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
      })
      const {
        meta: { requestId },
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
      const errorMock = new DeleteContactsError(
        "Delete Contacts request failed"
      )
      const mockStore = createMockStore([thunk])({
        contacts: initialState,
      })
      const {
        meta: { requestId },
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
      ;(deleteContactsRequest as jest.Mock).mockReturnValue(errorDeviceWithExceptionsResponse)
      const mockStore = createMockStore([thunk])({
        contacts: initialState,
      })
      const {
        meta: { requestId },
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
