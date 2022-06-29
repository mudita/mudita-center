/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ReduxRootState } from "App/__deprecated__/renderer/store"
import { contactHashSelector } from "App/contacts/selectors/contacts-hash.selector"
import { ContactsHashTable } from "App/contacts/data-structures/contacts-hash-table.structure"
import { initialState, ContactsState } from "App/contacts/reducers"
import { Contact } from "App/contacts/dto"

const contactsHash = new ContactsHashTable()

const contacts: Record<string, Contact> = {
  1: {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "example@mudita.com",
    primaryPhoneNumber: "123 456 789",
    secondaryPhoneNumber: "32 123 44 55",
    firstAddressLine: "4929 Pine Garden Lane",
    secondAddressLine: "Atlanta, GA, 30339, USA",
    note: "",
  },
  2: {
    id: "2",
    firstName: "Sławomir",
    lastName: "Borewicz",
    primaryPhoneNumber: "+71 195 069 214",
    secondaryPhoneNumber: "",
    email: "example@mudita.com",
    note: "sapiente rem dignissimos sunt",
    ice: false,
    favourite: false,
    blocked: false,
    firstAddressLine: "Malczewskiego 3, Warszawa",
    secondAddressLine: "",
  },
  3: {
    id: "3",
    firstName: "Edmund",
    lastName: "",
    primaryPhoneNumber: "+46 333 060 911",
    secondaryPhoneNumber: "",
    email: "",
    note: "temporibus molestiae",
    ice: true,
    favourite: false,
    blocked: false,
    firstAddressLine: "016 McClure Curve",
    secondAddressLine: "",
  },
  4: {
    id: "4",
    firstName: "",
    lastName: "",
    primaryPhoneNumber: "911",
    secondaryPhoneNumber: "",
    email: "",
    note: "",
    ice: true,
    favourite: false,
    blocked: false,
    firstAddressLine: "",
    secondAddressLine: "",
  },
}

describe("When contacts state is empty", () => {
  test("selector returns empty table", () => {
    const state = {
      contacts: initialState,
    } as ReduxRootState
    expect(contactHashSelector(state).table).toEqual(contactsHash.table)
  })
})

describe("When contacts state have records", () => {
  test("selector returns empty table", () => {
    const state = {
      contacts: {
        db: contacts,
        collection: ["1", "2", "3", "4"],
      } as unknown as ContactsState,
    } as ReduxRootState

    expect(contactHashSelector(state).table).toEqual({
      b: [
        {
          id: "2",
          firstName: "Sławomir",
          lastName: "Borewicz",
          primaryPhoneNumber: "+71 195 069 214",
          secondaryPhoneNumber: "",
          email: "example@mudita.com",
          note: "sapiente rem dignissimos sunt",
          ice: false,
          favourite: false,
          blocked: false,
          firstAddressLine: "Malczewskiego 3, Warszawa",
          secondAddressLine: "",
        },
      ],
      d: [
        {
          id: "1",
          firstName: "John",
          lastName: "Doe",
          email: "example@mudita.com",
          primaryPhoneNumber: "123 456 789",
          secondaryPhoneNumber: "32 123 44 55",
          firstAddressLine: "4929 Pine Garden Lane",
          secondAddressLine: "Atlanta, GA, 30339, USA",
          note: "",
        },
      ],
      "": [
        {
          id: "3",
          firstName: "Edmund",
          lastName: "",
          primaryPhoneNumber: "+46 333 060 911",
          secondaryPhoneNumber: "",
          email: "",
          note: "temporibus molestiae",
          ice: true,
          favourite: false,
          blocked: false,
          firstAddressLine: "016 McClure Curve",
          secondAddressLine: "",
        },
        {
          id: "4",
          firstName: "",
          lastName: "",
          primaryPhoneNumber: "911",
          secondaryPhoneNumber: "",
          email: "",
          note: "",
          ice: true,
          favourite: false,
          blocked: false,
          firstAddressLine: "",
          secondAddressLine: "",
        },
      ],
    })
  })
})
