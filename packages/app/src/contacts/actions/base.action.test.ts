/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import thunk from "redux-thunk"
import createMockStore from "redux-mock-store"
import {
  addNewContactToState,
  devClearAllContacts,
  editContactInState,
  setContacts,
} from "App/contacts/actions/base.action"
import { ContactsEvent } from "App/contacts/constants"
import { Contact } from "App/contacts/reducers"

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

const mockStore = createMockStore([thunk])()

afterEach(() => {
  mockStore.clearActions()
})

describe("Action: setContacts", () => {
  test("fire action without payload and `SetContacts` type", () => {
    mockStore.dispatch(setContacts([contact]))
    expect(mockStore.getActions()).toEqual([
      {
        type: ContactsEvent.SetContacts,
        payload: [contact],
      },
    ])
  })
})

describe("Action: addNewContactToState", () => {
  test("fire action without payload and `AddNewContactToState` type", () => {
    mockStore.dispatch(addNewContactToState(contact))
    expect(mockStore.getActions()).toEqual([
      {
        type: ContactsEvent.AddNewContactToState,
        payload: contact,
      },
    ])
  })
})

describe("Action: editContactInState", () => {
  test("fire action without payload and `EditContactInState` type", () => {
    mockStore.dispatch(editContactInState(contact))
    expect(mockStore.getActions()).toEqual([
      {
        type: ContactsEvent.EditContactInState,
        payload: contact,
      },
    ])
  })
})

describe("Action: devClearAllContacts", () => {
  test("fire action without payload and `DevClearAllContacts` type", () => {
    mockStore.dispatch(devClearAllContacts())
    expect(mockStore.getActions()).toEqual([
      {
        type: ContactsEvent.DevClearAllContacts,
        payload: undefined,
      },
    ])
  })
})
