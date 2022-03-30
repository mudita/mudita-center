/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AnyAction } from "@reduxjs/toolkit"
import thunk from "redux-thunk"
import createMockStore from "redux-mock-store"
import { ContactsEvent } from "App/contacts/constants"
import editContactRequest from "App/contacts/requests/edit-contact.request"
import { Contact, initialState } from "App/contacts/reducers"
import { testError } from "Renderer/store/constants"
import DeviceResponse, {
  DeviceResponseStatus,
} from "Backend/adapters/device-response.interface"
import { editContact } from "App/contacts/actions/edit-contact.action"
import { EditContactError } from "App/contacts/errors/edit-contact.error"

jest.mock("Renderer/requests/edit-contact.request")

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
      const errorMock = new EditContactError("Edit Contact request failed")
      const mockStore = createMockStore([thunk])({
        contacts: initialState,
      })
      const {
        meta: { requestId },
      } = await mockStore.dispatch(editContact(contact) as unknown as AnyAction)

      expect(mockStore.getActions()).toEqual([
        editContact.pending(requestId, contact),
        editContact.rejected(testError, requestId, contact, errorMock),
      ])

      expect(editContactRequest).toHaveBeenCalled()
    })
  })
})
