/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ContactsHashTable } from "App/contacts/data-structures/contacts-hash-table.structure"
import { Contact } from "App/contacts/dto"

let subject = new ContactsHashTable()

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
  beforeEach(() => {
    contacts.forEach((contact) => {
      subject.push(contact)
    })
  })

  afterEach(() => {
    subject = new ContactsHashTable()
  })

  test("returns alphabetically sorted hash with contacts", () => {
    expect(subject.table["b"]).toEqual([contacts[1]])
    expect(subject.table["d"]).toEqual([contacts[0]])
    expect(subject.table[""]).toEqual([contacts[2]])
  })
})

describe("Method: map", () => {
  beforeEach(() => {
    contacts.forEach((contact) => {
      subject.push(contact)
    })
  })

  afterEach(() => {
    subject = new ContactsHashTable()
  })

  test("returns filled hash with contacts", () => {
    expect(
      subject.map((key, value) => {
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        return `key: ${key} name: ${value[0].firstName} phone: ${value[0].primaryPhoneNumber}`
      })
    ).toEqual([
      "key:  name: Edmund phone: +46 333 060 911",
      "key: b name: Sławomir phone: +71 195 069 214",
      "key: d name: John phone: 123 456 789",
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
    subject = new ContactsHashTable()
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
    subject = new ContactsHashTable()
  })

  test("returns length of hash", () => {
    expect(subject.length).toEqual(3)
  })
})
