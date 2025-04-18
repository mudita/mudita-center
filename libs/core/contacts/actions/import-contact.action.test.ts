/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AnyAction } from "@reduxjs/toolkit"
import {
  importContact,
  ImportContactArg,
} from "Core/contacts/actions/import-contact.action"
import { ContactsEvent } from "Core/contacts/constants"
import { Contact, initialState, NewContact } from "Core/contacts/reducers"
import {
  createContactRequest,
  editContactRequest,
} from "Core/contacts/requests"
import { AppError } from "Core/core/errors"
import {
  RequestResponse,
  RequestResponseStatus,
} from "Core/core/types/request-response.interface"
import { testError } from "Core/__deprecated__/renderer/store/constants"
import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"

jest.mock("Core/contacts/requests/create-contact.request")
jest.mock("Core/contacts/requests/edit-contact.request")

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

const importContactArg: ImportContactArg = {
  newContact,
  activeDeviceId: "1234567",
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
        activeDeviceRegistry: {
          activeDeviceId: importContactArg.activeDeviceId,
        },
      })
      const {
        meta: { requestId },
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/await-thenable
      } = await mockStore.dispatch(
        importContact(importContactArg) as unknown as AnyAction
      )

      expect(mockStore.getActions()).toEqual([
        importContact.pending(requestId, importContactArg),
        importContact.fulfilled(
          successDeviceResponse.data as Contact,
          requestId,
          importContactArg
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
        activeDeviceRegistry: {
          activeDeviceId: importContactArg.activeDeviceId,
        },
      })
      const {
        meta: { requestId },
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/await-thenable
      } = await mockStore.dispatch(
        importContact(importContactArg) as unknown as AnyAction
      )

      expect(mockStore.getActions()).toEqual([
        importContact.pending(requestId, importContactArg),
        importContact.rejected(
          testError,
          requestId,
          importContactArg,
          errorMock
        ),
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
        activeDeviceRegistry: {
          activeDeviceId: importContactArg.activeDeviceId,
        },
      })
      const {
        meta: { requestId },
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/await-thenable
      } = await mockStore.dispatch(
        importContact(importContactArg) as unknown as AnyAction
      )

      expect(mockStore.getActions()).toEqual([
        importContact.pending(requestId, importContactArg),
        importContact.fulfilled(
          {
            ...newContact,
            // AUTO DISABLED - fix me if you like :)
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-non-null-assertion
            id: duplicatedErrorDeviceResponse.error!.data.id,
          },
          requestId,
          importContactArg
        ),
      ])

      expect(createContactRequest).toHaveBeenCalled()
      expect(editContactRequest).toHaveBeenCalled()
    })
  })
})
