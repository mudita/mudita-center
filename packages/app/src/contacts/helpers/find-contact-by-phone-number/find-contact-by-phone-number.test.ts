/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import findContactByPhoneNumber from "App/contacts/helpers/find-contact-by-phone-number/find-contact-by-phone-number"
import { Contact } from "App/contacts/store/contacts.type"

const contacts: Contact[] = [
  {
    id: "0",
    firstName: "Sławomir",
    lastName: "Borewicz",
    primaryPhoneNumber: "+48 256 123 009",
    secondaryPhoneNumber: "",
    email: "milicjant@buziaczek.pl",
    note: "sapiente rem dignissimos sunt",
    ice: false,
    favourite: false,
    blocked: false,
    firstAddressLine: "Malczewskiego 3, Warszawa",
    secondAddressLine: "",
  },
  {
    id: "274970a2-13b7-4f42-962d-8fa0b2b48377",
    firstName: "",
    lastName: "",
    primaryPhoneNumber: "+71 195 069 214",
    secondaryPhoneNumber: "322 12 21",
    email: "Lavina_Bartoletti@yahoo.com",
    note: "sapiente rem dignissimos sunt",
    ice: true,
    favourite: false,
    blocked: true,
    firstAddressLine: "3284 Klocko Plains",
    secondAddressLine: "",
  },
]

test("function finds contact by primary number properly", () => {
  const result = findContactByPhoneNumber(
    contacts,
    contacts[0].primaryPhoneNumber as string
  )
  expect(result).toStrictEqual(contacts[0])
})

test("function finds contact by secondary number properly", () => {
  const result = findContactByPhoneNumber(
    contacts,
    contacts[1].secondaryPhoneNumber as string
  )
  expect(result).toStrictEqual(contacts[1])
})

test("function returns undefined if no contact was found", () => {
  const result = findContactByPhoneNumber(contacts, "+00 000 000")
  expect(result).toBeUndefined()
})
