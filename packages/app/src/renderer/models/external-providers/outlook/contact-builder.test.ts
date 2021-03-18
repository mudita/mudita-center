/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { ContactBuilder } from "Renderer/models/external-providers/outlook/contact-builder"
import {
  OutlookContactAddress,
  OutlookEmailAddress,
} from "Renderer/models/external-providers/outlook/outlook.interface"

test("adds id", () => {
  const contactBuilder = new ContactBuilder()
  const id = "123"
  contactBuilder.addId(id)
  expect(contactBuilder.build().id).toEqual(id)
})

test("adds multiple phone numbers correctly", () => {
  const contactBuilder = new ContactBuilder()
  const phoneNumbers = ["12345667", "2312312", "123123"]
  contactBuilder.addPhoneNumbers(phoneNumbers)
  expect(contactBuilder.build().primaryPhoneNumber).toEqual(phoneNumbers[0])
  expect(contactBuilder.build().secondaryPhoneNumber).toEqual(phoneNumbers[1])
})

test("adds single phone number correctly", () => {
  const contactBuilder = new ContactBuilder()
  const phoneNumbers = ["12345667"]
  contactBuilder.addPhoneNumbers(phoneNumbers)
  expect(contactBuilder.build().primaryPhoneNumber).toEqual(phoneNumbers[0])
  expect(contactBuilder.build().secondaryPhoneNumber).toEqual("")
})

test("empty phone numbers stay empty", () => {
  const contactBuilder = new ContactBuilder()
  const phoneNumbers = [""]
  contactBuilder.addPhoneNumbers(phoneNumbers)
  expect(contactBuilder.build().primaryPhoneNumber).toEqual("")
  expect(contactBuilder.build().secondaryPhoneNumber).toEqual("")
})

test("adds address correctly with multiple addresses as input", () => {
  const contactBuilder = new ContactBuilder()
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
    `${addresses[0].postalCode} ${addresses[0].city} ${addresses[0].countryOrRegion}`
  )
})

test("adds address lines correctly with some fields missing", () => {
  const contactBuilder = new ContactBuilder()
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
    `${addresses[0].city} ${addresses[0].countryOrRegion}`
  )
})

test("adds first name correctly ", () => {
  const contactBuilder = new ContactBuilder()
  contactBuilder.addFirstName("John")
  expect(contactBuilder.build().firstName).toEqual("John")
})

test("adds last name correctly ", () => {
  const contactBuilder = new ContactBuilder()
  const lastName = "Doe"
  contactBuilder.addLastName(lastName)
  expect(contactBuilder.build().lastName).toEqual(lastName)
})

test("adds note correctly", () => {
  const contactBuilder = new ContactBuilder()
  const exampleNote =
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, quae?"
  contactBuilder.addNote(exampleNote)
  expect(contactBuilder.build().note).toEqual(exampleNote)
})

test("adds email correctly", () => {
  const contactBuilder = new ContactBuilder()
  const emails: OutlookEmailAddress[] = [
    { name: "email name", address: "example@mudita.com" },
  ]
  contactBuilder.addEmailAddress(emails)
  expect(contactBuilder.build().email).toEqual(emails[0].address)
})
