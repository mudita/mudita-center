/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { PayloadAction } from "@reduxjs/toolkit"
import {
  contactsReducer,
  initialState,
} from "App/contacts/reducers/contacts.reducer"
import { ContactsEvent } from "App/contacts/constants"
import { Contact, ResultState } from "App/contacts/reducers/contacts.interface"
import { fulfilledAction, pendingAction, rejectedAction } from "Renderer/store"
import { LoadContactsError } from "App/contacts/errors"

describe("Load Contacts data functionality", () => {
  test("Event: LoadContacts/pending change `resultState` to Loading", () => {
    expect(
      contactsReducer(undefined, {
        type: pendingAction(ContactsEvent.LoadContacts),
      })
    ).toEqual({
      ...initialState,
      resultState: ResultState.Loading,
    })
  })

  test("Event: LoadContacts/fulfilled change `resultState` to Loaded", () => {
    expect(
      contactsReducer(undefined, {
        type: fulfilledAction(ContactsEvent.LoadContacts),
      })
    ).toEqual({
      ...initialState,
      resultState: ResultState.Loaded,
    })
  })

  test("Event: LoadContacts/rejected change `resultState` to Error", () => {
    const errorMock = new LoadContactsError("I'm error")

    expect(
      contactsReducer(undefined, {
        type: rejectedAction(ContactsEvent.LoadContacts),
        payload: errorMock,
      })
    ).toEqual({
      ...initialState,
      resultState: ResultState.Error,
      error: errorMock,
    })
  })
})

describe("Set Contacts data functionality", () => {
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

  test("Event: SetContactsAction set properly collection and db fields", () => {
    const setContactsAction: PayloadAction<Contact[]> = {
      type: ContactsEvent.SetContacts,
      payload: [contact],
    }

    expect(contactsReducer(undefined, setContactsAction)).toEqual({
      ...initialState,
      collection: ["0"],
      db: {
        "0": {
          email: "example@mudita.com",
          firstAddressLine: "Malczewskiego 3, Warszawa",
          firstName: "Sławomir",
          id: "0",
          lastName: "Borewicz",
          note: "sapiente rem dignissimos sunt",
          primaryPhoneNumber: "+71195069214",
        },
      },
    })
  })
})

describe("AddNewContactToState data functionality", () => {
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

  test("Event: AddNewContactToState set properly collection and db fields", () => {
    const setContactsAction: PayloadAction<Contact> = {
      type: ContactsEvent.AddNewContactToState,
      payload: contact,
    }

    expect(contactsReducer(undefined, setContactsAction)).toEqual({
      ...initialState,
      collection: ["0"],
      db: {
        "0": {
          email: "example@mudita.com",
          firstAddressLine: "Malczewskiego 3, Warszawa",
          firstName: "Sławomir",
          id: "0",
          lastName: "Borewicz",
          note: "sapiente rem dignissimos sunt",
          primaryPhoneNumber: "+71195069214",
        },
      },
    })
  })
})

describe("EditContactInState data functionality", () => {
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
  const editedContact: Contact = {
    ...contact,
    primaryPhoneNumber: "+000000000",
  }

  test("Event: EditContactInState set properly collection and db fields", () => {
    const setContactsAction: PayloadAction<Contact> = {
      type: ContactsEvent.EditContactInState,
      payload: editedContact,
    }

    expect(
      contactsReducer(
        {
          ...initialState,
          collection: [contact.id],
          db: {
            [contact.id]: contact,
          },
        },
        setContactsAction
      )
    ).toEqual({
      ...initialState,
      collection: ["0"],
      db: {
        "0": {
          blocked: false,
          email: "example@mudita.com",
          favourite: false,
          firstAddressLine: "Malczewskiego 3, Warszawa",
          firstName: "Sławomir",
          ice: false,
          id: "0",
          lastName: "Borewicz",
          note: "sapiente rem dignissimos sunt",
          primaryPhoneNumber: "+000000000",
          secondAddressLine: "",
          secondaryPhoneNumber: "",
        },
      },
    })
  })
})

describe("Clear All Contacts data functionality", () => {
  test("Event: DevClearAllContacts clear properly db, collection and resultState", () => {
    expect(
      contactsReducer(
        {
          ...initialState,
        },
        { type: ContactsEvent.DevClearAllContacts }
      )
    ).toEqual({
      ...initialState,
      db: {},
      collection: [],
      resultState: ResultState.Empty,
    })
  })
})
