/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import {
  handleScope,
  mapContact,
  requestTokens,
} from "Renderer/models/external-providers/outlook/outlook.helpers"
import { OutLookScope } from "Renderer/models/external-providers/outlook/outlook.interface"
import MockAdapter from "axios-mock-adapter"
import axios from "axios"

const scope = "offline_access, https://graph.microsoft.com/contacts.readwrite"

let axiosMock = new MockAdapter(axios)
const contact = {
  id: "AQMkADA=",
  givenName: "Kamil",
  surname: "Bombolowski",
  homePhones: ["111111111111", "2222222222"],
  mobilePhone: "+484238423489234",
  personalNotes: "notatka",
  emailAddresses: [
    {
      name: "hello@mudita.com",
      address: "hello@mudita.com",
    },
  ],
  homeAddress: {
    street: "home",
    city: "Warszawa",
    countryOrRegion: "Polska",
    postalCode: "00-732",
  },
  businessAddress: {
    street: "business",
    city: "1111",
  },
  otherAddress: {},
}

beforeEach(() => {
  axiosMock = new MockAdapter(axios)
})

test("requestTokens returns token", async () => {
  axiosMock.onPost().reply(200, {
    access_token: "token-123",
    refresh_token: "refresh_token-1234",
  })
  const tokens = await requestTokens("M.R3_BAY.123", scope)
  expect(tokens.access_token).toBe("token-123")
})

test("handleScope returns proper value", () => {
  expect(handleScope(OutLookScope.Contacts)).toBe(scope)
})

test("maps contacts correctly", () => {
  const {
    id,
    firstName,
    lastName,
    email,
    primaryPhoneNumber,
    secondaryPhoneNumber,
    note,
  } = mapContact(contact)
  expect(id).toEqual(contact.id)
  expect(firstName).toEqual(contact.givenName)
  expect(lastName).toEqual(contact.surname)
  expect(email).toEqual(contact.emailAddresses[0].address)
  expect(primaryPhoneNumber).toEqual(contact.mobilePhone)
  expect(secondaryPhoneNumber).toEqual(contact.homePhones[0])
  expect(note).toEqual(contact.personalNotes)
})

test("phone numbers are mapped correctly with home phone numbers as input", () => {
  const contact = {
    id: "AQMkADA=",
    givenName: "Kamil",
    surname: "Bombolowski",
    homePhones: ["111111111111", "2222222222"],
  }
  const { primaryPhoneNumber, secondaryPhoneNumber } = mapContact(contact)
  expect(primaryPhoneNumber).toEqual(contact.homePhones[0])
  expect(secondaryPhoneNumber).toEqual(contact.homePhones[1])
})

test("phone numbers are mapped correctly with mobile and business phone numbers as input", () => {
  const contact = {
    id: "AQMkADA=",
    givenName: "Kamil",
    surname: "Bombolowski",
    mobilePhone: "+484238423489234",
    businessPhones: ["2222222222"],
  }
  const { primaryPhoneNumber, secondaryPhoneNumber } = mapContact(contact)
  expect(primaryPhoneNumber).toEqual(contact.mobilePhone)
  expect(secondaryPhoneNumber).toEqual(contact.businessPhones[0])
})

test("phone numbers are mapped correctly with home and business phone numbers as input", () => {
  const contact = {
    id: "AQMkADA=",
    givenName: "Kamil",
    surname: "Bombolowski",
    homePhones: ["111111111111"],
    businessPhones: ["2222222222"],
  }
  const { primaryPhoneNumber, secondaryPhoneNumber } = mapContact(contact)
  expect(primaryPhoneNumber).toEqual(contact.homePhones[0])
  expect(secondaryPhoneNumber).toEqual(contact.businessPhones[0])
})

test("phone numbers are mapped correctly with business phone numbers as input", () => {
  const contact = {
    id: "AQMkADA=",
    givenName: "Kamil",
    surname: "Bombolowski",
    businessPhones: ["111111111111", "2222222222"],
  }
  const { primaryPhoneNumber, secondaryPhoneNumber } = mapContact(contact)
  expect(primaryPhoneNumber).toEqual(contact.businessPhones[0])
  expect(secondaryPhoneNumber).toEqual(contact.businessPhones[1])
})

test("address is mapped correctly with business address as input", () => {
  const contact = {
    id: "AQMkADA=",
    givenName: "Kamil",
    surname: "Bombolowski",
    businessAddress: {
      street: "business street",
      city: "Warsaw",
      countryOrRegion: "Mazowieckie",
      postalCode: "00-000",
    },
  }
  const { firstAddressLine, secondAddressLine } = mapContact(contact)
  expect(firstAddressLine).toEqual(contact.businessAddress.street)
  expect(secondAddressLine).toEqual(
    `${contact.businessAddress.postalCode} ${contact.businessAddress.city} ${contact.businessAddress.countryOrRegion}`
  )
})

test("address is mapped correctly with other address as input", () => {
  const contact = {
    id: "AQMkADA=",
    givenName: "Kamil",
    surname: "Bombolowski",
    otherAddress: {
      street: "business street",
      city: "Warsaw",
      countryOrRegion: "Mazowieckie",
      postalCode: "00-000",
    },
  }
  const { firstAddressLine, secondAddressLine } = mapContact(contact)
  expect(firstAddressLine).toEqual(contact.otherAddress.street)
  expect(secondAddressLine).toEqual(
    `${contact.otherAddress.postalCode} ${contact.otherAddress.city} ${contact.otherAddress.countryOrRegion}`
  )
})
