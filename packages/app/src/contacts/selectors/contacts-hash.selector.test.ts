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
    primaryPhoneNumberId: "123 456 789",
    secondaryPhoneNumberId: "32 123 44 55",
    firstAddressLine: "4929 Pine Garden Lane",
    secondAddressLine: "Atlanta, GA, 30339, USA",
    note: "",
  },
  2: {
    id: "2",
    firstName: "Sławomir",
    lastName: "Borewicz",
    primaryPhoneNumberId: "+71 195 069 214",
    secondaryPhoneNumberId: "",
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
    primaryPhoneNumberId: "+46 333 060 911",
    secondaryPhoneNumberId: "",
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
    primaryPhoneNumberId: "911",
    secondaryPhoneNumberId: "",
    email: "",
    note: "",
    ice: true,
    favourite: false,
    blocked: false,
    firstAddressLine: "",
    secondAddressLine: "",
  },
  5: {
    id: "4",
    firstName: "Jan",
    lastName: "Nowak",
    primaryPhoneNumberId: "",
    secondaryPhoneNumberId: "",
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
    expect(contactHashSelector(false)(state).table).toEqual(contactsHash.table)
  })
})

describe("When contacts state have records", () => {
  test("selector hash table with contacts", () => {
    const state = {
      contacts: {
        db: contacts,
        collection: ["1", "2", "3", "4", "5"],
      } as unknown as ContactsState,
    } as ReduxRootState

    expect(contactHashSelector(false)(state).table).toEqual({
      b: [
        {
          id: "2",
          firstName: "Sławomir",
          lastName: "Borewicz",
          primaryPhoneNumberId: "+71 195 069 214",
          secondaryPhoneNumberId: "",
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
          primaryPhoneNumberId: "123 456 789",
          secondaryPhoneNumberId: "32 123 44 55",
          firstAddressLine: "4929 Pine Garden Lane",
          secondAddressLine: "Atlanta, GA, 30339, USA",
          note: "",
        },
      ],
      e: [
        {
          id: "3",
          firstName: "Edmund",
          lastName: "",
          primaryPhoneNumberId: "+46 333 060 911",
          secondaryPhoneNumberId: "",
          email: "",
          note: "temporibus molestiae",
          ice: true,
          favourite: false,
          blocked: false,
          firstAddressLine: "016 McClure Curve",
          secondAddressLine: "",
        },
      ],
      "": [
        {
          id: "4",
          firstName: "",
          lastName: "",
          primaryPhoneNumberId: "911",
          secondaryPhoneNumberId: "",
          email: "",
          note: "",
          ice: true,
          favourite: false,
          blocked: false,
          firstAddressLine: "",
          secondAddressLine: "",
        },
      ],
      n: [
        {
          blocked: false,
          email: "",
          favourite: false,
          firstAddressLine: "",
          firstName: "Jan",
          ice: true,
          id: "4",
          lastName: "Nowak",
          note: "",
          primaryPhoneNumberId: "",
          secondAddressLine: "",
          secondaryPhoneNumberId: "",
        },
      ],
    })
  })
})

describe("selector can filter contact by existence of primary or secondary phone number", () => {
  const state = {
    contacts: {
      db: contacts,
      collection: ["4", "5"],
    } as unknown as ContactsState,
  } as ReduxRootState

  expect(contactHashSelector(false)(state).table).toMatchInlineSnapshot(`
    Object {
      "": Array [
        Object {
          "blocked": false,
          "email": "",
          "favourite": false,
          "firstAddressLine": "",
          "firstName": "",
          "ice": true,
          "id": "4",
          "lastName": "",
          "note": "",
          "primaryPhoneNumberId": "911",
          "secondAddressLine": "",
          "secondaryPhoneNumberId": "",
        },
      ],
      "n": Array [
        Object {
          "blocked": false,
          "email": "",
          "favourite": false,
          "firstAddressLine": "",
          "firstName": "Jan",
          "ice": true,
          "id": "4",
          "lastName": "Nowak",
          "note": "",
          "primaryPhoneNumberId": "",
          "secondAddressLine": "",
          "secondaryPhoneNumberId": "",
        },
      ],
    }
  `)

  expect(contactHashSelector(true)(state).table).toMatchInlineSnapshot(`
    Object {
      "": Array [
        Object {
          "blocked": false,
          "email": "",
          "favourite": false,
          "firstAddressLine": "",
          "firstName": "",
          "ice": true,
          "id": "4",
          "lastName": "",
          "note": "",
          "primaryPhoneNumberId": "911",
          "secondAddressLine": "",
          "secondaryPhoneNumberId": "",
        },
      ],
    }
  `)
})
