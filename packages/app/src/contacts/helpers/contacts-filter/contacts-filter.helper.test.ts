/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { contactsFilter } from "App/contacts/helpers/contacts-filter/contacts-filter.helper"
import { Contact } from "App/contacts/dto"

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
  {
    id: "6e3810c8-c917-45d2-ae17-b83f73127e08",
    firstName: "Oswald",
    lastName: "Bednar",
    secondaryPhoneNumber: "+62761294266",
    email: "oswald.bednar@mudita.com",
    note: "cum aut voluptatem sunt",
    favourite: true,
    firstAddressLine: "30177 Altenwerth Trace",
    secondAddressLine: "East Percivalberg",
  },
  {
    id: "6e3810c8-c917-45d2-ae17-b83f73127e08",
    firstName: "Oswald",
    lastName: "Bednar",
    secondaryPhoneNumber: "761294266",
    email: "oswald.bednar@mudita.com",
    note: "cum aut voluptatem sunt",
    favourite: true,
    firstAddressLine: "30177 Altenwerth Trace",
    secondAddressLine: "Bednarów 3",
  },
  {
    id: "6e3810c8-c917",
    firstName: "Oswald",
    lastName: "Bednar",
  },
]

test("returns true when search string in email", () => {
  const searchString = "example"
  const result = contactsFilter(contacts[0], searchString)
  expect(result).toBe(true)
})

test("returns true when search string in primaryPhoneNumber", () => {
  const searchString = "069"
  const result = contactsFilter(contacts[0], searchString)
  expect(result).toBe(true)
})

test("returns false when no match ", () => {
  const searchString = "000"
  const result = contactsFilter(contacts[0], searchString)
  expect(result).toBe(false)
})

test("returns true when match and if contact don't have all params ", () => {
  const searchString = "Bednarów 3"
  const result = contactsFilter(contacts[3], searchString)
  expect(result).toBe(false)
})
