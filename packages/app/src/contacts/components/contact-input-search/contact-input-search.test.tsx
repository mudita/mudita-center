/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  secondParam,
  renderPhoneNumber,
} from "App/contacts/components/contact-input-search/contact-input-search.component"
import { Contact } from "App/contacts/store/contacts.type"

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

describe("secondParam", () => {
  test("should return primaryNumber when search string match only name", () => {
    const searchString = "Sławomir"
    const result = secondParam(contacts[0], searchString)
    expect(result).toBe("+71 195 069 214")
  })

  test("should return secondaryNumber when search string match only name and there is no primaryNumber", () => {
    const searchString = "Oswald Bednar"
    const result = secondParam(contacts[1], searchString)
    expect(result).toBe("+62 761 294 266")
  })

  test("should return email when email contains name and searching string is name", () => {
    const searchString = "Oswald"
    const result = secondParam(contacts[1], searchString)
    expect(result).toBe("oswald.bednar@mudita.com")
  })

  test("should return number when email don't contains name and searching string is name", () => {
    const searchString = "Sławomir"
    const result = secondParam(contacts[0], searchString)
    expect(result).toBe("+71 195 069 214")
  })

  test("should return primaryNumber when search string match primaryNumber", () => {
    const searchString = "7119"
    const result = secondParam(contacts[0], searchString)
    expect(result).toBe("+71 195 069 214")
  })

  test("should return secondaryNumber when search string match secondaryNumber", () => {
    const searchString = "+62761294266"
    const result = secondParam(contacts[1], searchString)
    expect(result).toBe("+62 761 294 266")
  })

  test("should return address when search string match address", () => {
    const searchString = "mal"
    const result = secondParam(contacts[0], searchString)
    expect(result).toBe("Malczewskiego 3, Warszawa")
  })

  test("should return email when search string match email and address", () => {
    const searchString = "bednar"
    const result = secondParam(contacts[2], searchString)
    expect(result).toBe("oswald.bednar@mudita.com")
  })

  test("should return secondNumber when search string match email and address", () => {
    const searchString = "bednar"
    const result = secondParam(contacts[2], searchString)
    expect(result).toBe("oswald.bednar@mudita.com")
  })

  test("should return no data provided when search string match only name and contact has no other params", () => {
    const searchString = "oswald"
    const result = secondParam(contacts[3], searchString)
    expect(result).toBe("[value] module.contacts.panelSearchListNoData")
  })
})

describe("renderPhoneNumber", () => {
  test("should return formatted number with area code", () => {
    const number = "+48123456789"
    const result = renderPhoneNumber(number)
    expect(result).toBe("+48 123 456 789")
  })

  test("should return formatted number", () => {
    const number = "123456789"
    const result = renderPhoneNumber(number)
    expect(result).toBe("123 456 789")
  })
})
