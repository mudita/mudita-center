/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { AnyAction } from "@reduxjs/toolkit"
import getContacts from "Renderer/requests/get-contacts.request"
import { Contact, initialState } from "App/contacts/reducers"
import DeviceResponse, {
  DeviceResponseStatus,
} from "Backend/adapters/device-response.interface"
import { loadContacts } from "App/contacts/actions/load-contacts.action"
import { ContactsEvent } from "App/contacts/constants"
import { LoadContactsError } from "App/contacts/errors"
import { testError } from "Renderer/store/constants"

jest.mock("Renderer/requests/get-contacts.request")

const contacts: Contact[] = [
  {
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
  },
]

const successDeviceResponse: DeviceResponse<Contact[]> = {
  status: DeviceResponseStatus.Ok,
  data: contacts,
}

const errorDeviceResponse: DeviceResponse = {
  status: DeviceResponseStatus.Error,
}

afterEach(() => {
  jest.resetAllMocks()
})

describe("async `loadContacts` ", () => {
  describe("when `getContacts` request return success", () => {
    test("fire async `loadContacts` call `setContacts`", async () => {
      ;(getContacts as jest.Mock).mockReturnValue(successDeviceResponse)
      const mockStore = createMockStore([thunk])({
        contacts: initialState,
      })
      const {
        meta: { requestId },
      } = await mockStore.dispatch(loadContacts() as unknown as AnyAction)

      expect(mockStore.getActions()).toEqual([
        loadContacts.pending(requestId, undefined),
        {
          type: ContactsEvent.SetContacts,
          payload: contacts,
        },
        loadContacts.fulfilled(undefined, requestId, undefined),
      ])

      expect(getContacts).toHaveBeenCalled()
    })
  })

  describe("when `getContacts` request return error", () => {
    test("fire async `loadContacts` returns `rejected` action", async () => {
      ;(getContacts as jest.Mock).mockReturnValue(errorDeviceResponse)
      const errorMock = new LoadContactsError("Get Contacts request failed")
      const mockStore = createMockStore([thunk])({
        contacts: initialState,
      })
      const {
        meta: { requestId },
      } = await mockStore.dispatch(loadContacts() as unknown as AnyAction)

      expect(mockStore.getActions()).toEqual([
        loadContacts.pending(requestId, undefined),
        loadContacts.rejected(testError, requestId, undefined, errorMock),
      ])

      expect(getContacts).toHaveBeenCalled()
    })
  })
})
