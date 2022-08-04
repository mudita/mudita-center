/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FavouriteContactsHashTable } from "App/contacts/data-structures/favourite-contacts-hash-table.structure"
import { Contact } from "App/contacts/dto"

let subject = new FavouriteContactsHashTable()

const contacts: Contact[] = [
  {
    id: "abc-123",
    firstName: "John",
    lastName: "Doe",
    email: "example@mudita.com",
    primaryPhoneNumber: "123 456 789",
    secondaryPhoneNumber: "32 123 44 55",
    firstAddressLine: "4929 Pine Garden Lane",
    secondAddressLine: "Atlanta, GA, 30339, USA",
    note: "",
  },
  {
    id: "0",
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
  {
    id: "593cbb53-a8e7-48ca-8fa5-e18d525ea1f6",
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
]

test("returns empty hash", () => {
  expect(subject.table).toEqual({})
})

describe("Method: push", () => {
  afterEach(() => {
    subject = new FavouriteContactsHashTable()
  })

  beforeEach(() => {
    contacts.forEach((contact) => {
      subject.push(contact)
    })
  })

  test("returns category contacts hash", () => {
    expect(subject.table[""]).toEqual(contacts)
  })
})

describe("Method: map", () => {
  afterEach(() => {
    subject = new FavouriteContactsHashTable()
  })

  beforeEach(() => {
    contacts.forEach((contact) => {
      subject.push(contact)
    })
  })

  test("returns alphabetically sorted hash filled with contacts", () => {
    expect(
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      subject
        .map((key, value) => {
          return value.map(
            (contact) =>
              // AUTO DISABLED - fix me if you like :)
              // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
              `key: ${key} name: ${contact.firstName} phone: ${contact.primaryPhoneNumber}`
          )
        })
        .flat()
    ).toEqual([
      "key:  name: John phone: 123 456 789",
      "key:  name: Sławomir phone: +71 195 069 214",
      "key:  name: Edmund phone: +46 333 060 911",
    ])
  })
})

describe("Method: flat", () => {
  beforeEach(() => {
    contacts.forEach((contact) => {
      subject.push(contact)
    })
  })

  afterEach(() => {
    subject = new FavouriteContactsHashTable()
  })

  test("returns flatten contact list", () => {
    expect(subject.flat()).toEqual(contacts)
  })
})

describe("Method: length", () => {
  beforeEach(() => {
    contacts.forEach((contact) => {
      subject.push(contact)
    })
  })

  afterEach(() => {
    subject = new FavouriteContactsHashTable()
  })

  test("returns length of hash", () => {
    expect(subject.length).toEqual(1)
  })
})
