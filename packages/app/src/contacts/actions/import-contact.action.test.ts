/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AnyAction } from "@reduxjs/toolkit"
import thunk from "redux-thunk"
import createMockStore from "redux-mock-store"
import addContact from "Renderer/requests/add-contact.request"
import { Contact, initialState, NewContact } from "App/contacts/reducers"
import { testError } from "Renderer/store/constants"
import DeviceResponse, {
  DeviceResponseStatus,
} from "Backend/adapters/device-response.interface"
import { importContact } from "App/contacts/actions/import-contact.action"
import { ImportContactError } from "App/contacts/errors/import-contact.error"
import editContact from "Renderer/requests/edit-contact.request"

jest.mock("Renderer/requests/add-contact.request")
jest.mock("Renderer/requests/edit-contact.request")

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

const duplicatedErrorDeviceResponse: DeviceResponse = {
  status: DeviceResponseStatus.Duplicated,
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
      ;(addContact as jest.Mock).mockReturnValue(successDeviceResponse)
      const mockStore = createMockStore([thunk])({
        contacts: initialState,
      })
      const {
        meta: { requestId },
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

      expect(addContact).toHaveBeenCalled()
    })
  })

  describe("when `addContact` request return error", () => {
    test("fire async `importContact` returns `rejected` action", async () => {
      ;(addContact as jest.Mock).mockReturnValue(errorDeviceResponse)
      const errorMock = new ImportContactError("Import Contact request failed")
      const mockStore = createMockStore([thunk])({
        contacts: initialState,
      })
      const {
        meta: { requestId },
      } = await mockStore.dispatch(
        importContact(newContact) as unknown as AnyAction
      )

      expect(mockStore.getActions()).toEqual([
        importContact.pending(requestId, newContact),
        importContact.rejected(testError, requestId, newContact, errorMock),
      ])

      expect(addContact).toHaveBeenCalled()
    })
  })

  describe("when `addContact` request return duplicated error", () => {
    test("fire async `importContact` call `editContact` request", async () => {
      ;(addContact as jest.Mock).mockReturnValue(duplicatedErrorDeviceResponse)
      ;(editContact as jest.Mock).mockReturnValue(duplicatedErrorDeviceResponse)
      const mockStore = createMockStore([thunk])({
        contacts: initialState,
      })
      const {
        meta: { requestId },
      } = await mockStore.dispatch(
        importContact(newContact) as unknown as AnyAction
      )

      expect(mockStore.getActions()).toEqual([
        importContact.pending(requestId, newContact),
        importContact.fulfilled(
          {
            ...newContact,
            id: duplicatedErrorDeviceResponse.error!.data.id,
          } as Contact,
          requestId,
          newContact
        ),
      ])

      expect(addContact).toHaveBeenCalled()
      expect(editContact).toHaveBeenCalled()
    })
  })
})
