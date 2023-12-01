/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ContactBuilder } from "App/__deprecated__/renderer/models/external-providers/outlook/contact-builder"
import {
  OutlookContactAddress,
  OutlookEmailAddress,
} from "App/__deprecated__/renderer/models/external-providers/outlook/outlook.interface"

let contactBuilder: ContactBuilder

beforeEach(() => (contactBuilder = new ContactBuilder()))

test("adds id", () => {
  const id = "123"
  contactBuilder.addId(id)
  expect(contactBuilder.build().id).toEqual(id)
})

test("adds multiple phone numbers correctly", () => {
  const phoneNumbers = ["12345667", "2312312", "123123"]
  contactBuilder.addPhoneNumbers(phoneNumbers)
  expect(contactBuilder.build().primaryPhoneNumber).toEqual(phoneNumbers[0])
  expect(contactBuilder.build().secondaryPhoneNumber).toEqual(phoneNumbers[1])
})

test("adds single phone number correctly", () => {
  const phoneNumbers = ["12345667"]
  contactBuilder.addPhoneNumbers(phoneNumbers)
  expect(contactBuilder.build().primaryPhoneNumber).toEqual(phoneNumbers[0])
  expect(contactBuilder.build().secondaryPhoneNumber).toBeUndefined()
})

test("empty phone numbers stay empty", () => {
  const phoneNumbers = [""]
  contactBuilder.addPhoneNumbers(phoneNumbers)
  expect(contactBuilder.build().primaryPhoneNumber).toEqual("")
  expect(contactBuilder.build().secondaryPhoneNumber).toBeUndefined()
})

test("takes second passed number as primary if first one is empty", () => {
  const phoneNumbers = ["", "123"]
  contactBuilder.addPhoneNumbers(phoneNumbers)
  expect(contactBuilder.build().primaryPhoneNumber).toEqual(phoneNumbers[1])
  expect(contactBuilder.build().secondaryPhoneNumber).toBeUndefined()
})

test("adds address correctly with multiple addresses as input", () => {
  const addresses: OutlookContactAddress[] = [
    {
      city: "city1",
      street: "street1",
      postalCode: "00-000",
      countryOrRegion: "Mazowieckie",
    },
    {
      city: "city2",
      street: "street2",
    },
  ]
  contactBuilder.addAddress(addresses)
  expect(contactBuilder.build().firstAddressLine).toEqual(addresses[0].street)
  expect(contactBuilder.build().secondAddressLine).toEqual(
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    `${addresses[0].postalCode} ${addresses[0].city} ${addresses[0].countryOrRegion}`
  )
})

test("maps first address that is not empty", () => {
  const addresses: OutlookContactAddress[] = [
    {},
    {},
    {
      city: "city2",
      street: "street2",
    },
  ]
  contactBuilder.addAddress(addresses)
  expect(contactBuilder.build().firstAddressLine).toEqual(addresses[2].street)
  expect(contactBuilder.build().secondAddressLine).toEqual(addresses[2].city)
})

test("adds address lines correctly with some fields missing", () => {
  const addresses: OutlookContactAddress[] = [
    {
      city: "city1",
      street: "street1",
      countryOrRegion: "Mazowieckie",
    },
  ]
  contactBuilder.addAddress(addresses)
  expect(contactBuilder.build().firstAddressLine).toEqual(addresses[0].street)
  expect(contactBuilder.build().secondAddressLine).toEqual(
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    `${addresses[0].city} ${addresses[0].countryOrRegion}`
  )
})

test("adds first name correctly ", () => {
  contactBuilder.addFirstName("John")
  expect(contactBuilder.build().firstName).toEqual("John")
})

test("adds last name correctly ", () => {
  const lastName = "Doe"
  contactBuilder.addLastName(lastName)
  expect(contactBuilder.build().lastName).toEqual(lastName)
})

test("adds note correctly", () => {
  const exampleNote =
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, quae?"
  contactBuilder.addNote(exampleNote)
  expect(contactBuilder.build().note).toEqual(exampleNote)
})

test("adds email correctly", () => {
  const emails: OutlookEmailAddress[] = [
    { name: "email name", address: "example@mudita.com" },
  ]
  contactBuilder.addEmailAddress(emails)
  expect(contactBuilder.build().email).toEqual(emails[0].address)
})
