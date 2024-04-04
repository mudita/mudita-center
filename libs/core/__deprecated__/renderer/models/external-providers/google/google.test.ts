/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import google, {
  googleEndpoints,
} from "Core/__deprecated__/renderer/models/external-providers/google/google"
import {
  GoogleAuthSuccessResponse,
  GoogleContactResourceItem,
  Scope,
} from "Core/__deprecated__/renderer/models/external-providers/google/google.interface"
import axios from "axios"
import MockAdapter from "axios-mock-adapter"
import { GoogleAuthActions } from "Core/__deprecated__/common/enums/google-auth-actions.enum"
import { mapContact } from "Core/__deprecated__/renderer/models/external-providers/google/google.helpers"
import { init } from "@rematch/core"
import { mockedGoogleContacts } from "Core/__mocks__/google-contacts"

const authData: GoogleAuthSuccessResponse = {
  access_token: "some-token",
  token_type: "Bearer",
  expires_in: 3599,
  scope: "Calendars Contacts",
  refresh_token: "refresh-token-123",
}

jest.mock(
  "electron-better-ipc",
  () => {
    const mockIpcRenderer = {
      callMain: (channel: GoogleAuthActions) => {
        switch (channel) {
          case GoogleAuthActions.OpenWindow:
            return jest.fn()
          default:
            return false
        }
      },
      answerMain: (
        channel: GoogleAuthActions,
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        callback: (data: any) => PromiseLike<any>
      ) => {
        switch (channel) {
          case GoogleAuthActions.GotCredentials:
            void callback(JSON.stringify(authData))
            return true
          default:
            return false
        }
      },
    }
    return { ipcRenderer: mockIpcRenderer }
  },
  { virtual: true }
)

const initStore = () => {
  return init({
    models: { google },
  })
}

let store = initStore()
let axiosMock = new MockAdapter(axios)

beforeEach(() => {
  store = initStore()
  axiosMock = new MockAdapter(axios)
})

test("store returns initial state", () => {
  expect(store.getState()).toMatchInlineSnapshot(`
    Object {
      "google": Object {
        "calendar": Object {},
        "contacts": Object {},
      },
    }
  `)
})

test("auth data is set properly", () => {
  store.dispatch.google.setAuthData({ data: authData, scope: Scope.Calendar })
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  expect(store.getState().google.calendar).toMatchInlineSnapshot(`
    Object {
      "access_token": "some-token",
      "expires_in": 3599,
      "refresh_token": "refresh-token-123",
      "scope": "Calendars Contacts",
      "token_type": "Bearer",
    }
  `)
})

test("handles authorization properly", async () => {
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/await-thenable
  await store.dispatch.google.authorize("calendar")
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  expect(store.getState().google.calendar).toMatchInlineSnapshot(`
    Object {
      "access_token": "some-token",
      "expires_in": 3599,
      "refresh_token": "refresh-token-123",
      "scope": "Calendars Contacts",
      "token_type": "Bearer",
    }
  `)
})

test.todo("authorization handles error properly")

test("contacts are received properly", async () => {
  axiosMock
    .onGet(`${googleEndpoints.people}/people/me/connections`, {
      params: {
        personFields: "names,addresses,phoneNumbers,emailAddresses,biographies",
        pageSize: 1000,
      },
    })
    .reply(200, mockedGoogleContacts)

  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/await-thenable
  expect(await store.dispatch.google.getContacts()).toMatchInlineSnapshot(`
    Array [
      Object {
        "email": "example@mudita.com",
        "favourite": false,
        "firstAddressLine": "bomboladzka 1",
        "firstName": "Bombolo",
        "ice": false,
        "id": "people/c5420759609842671821",
        "lastName": "Bombolada",
        "note": "notatka",
        "primaryPhoneNumber": "11111111111111",
        "secondAddressLine": "00-123 Warsaw Extended address info123",
        "secondaryPhoneNumber": "",
      },
      Object {
        "email": "example@mudita.com",
        "favourite": false,
        "firstAddressLine": "lolo 123",
        "firstName": "Kolejny bombolek",
        "ice": false,
        "id": "people/c6026900974127078735",
        "lastName": "Bombolada",
        "note": "",
        "primaryPhoneNumber": "12341234234",
        "secondAddressLine": "123-123 Warsaw Extended address info",
        "secondaryPhoneNumber": "1234211211234",
      },
    ]
  `)
})

test("empty list is returned when no contacts", async () => {
  axiosMock
    .onGet(`${googleEndpoints.people}/people/me/connections`, {
      params: {
        personFields: "names,addresses,phoneNumbers,emailAddresses,biographies",
        pageSize: 1000,
      },
    })
    .reply(200, { totalItems: 0 })

  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/await-thenable
  expect(await store.dispatch.google.getContacts()).toMatchInlineSnapshot(
    `Array []`
  )
})

const commonInput = {
  resourceName: "people/c5420759609842671821",
  etag: "%EgwBAj0FCT4LPxBANy4aBAECBQciDEE1VzVERlU4NjljPQ==",
}

const examplePrimaryPhoneNumber = "123 456 999"
const exampleSecondaryPhoneNumber = "999 888 777"
const inputAddress = {
  streetAddress: "Marszałka Józefa Piłsudskiego 30",
  extendedAddress: "line 2",
  city: "Czerskiekienicice",
  postalCode: "89-650",
}
const displayNameLastFirst = "Doe, John"
const exampleMail = "example@mail.com"
const exampleNote =
  "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, quae?"

test("input with no fields returns each fields from google containing empty string beside id", () => {
  const {
    id,
    firstName,
    lastName,
    primaryPhoneNumber,
    secondaryPhoneNumber,
    email,
    firstAddressLine,
    secondAddressLine,
    note,
  } = mapContact(commonInput)
  expect(id).toEqual(commonInput.resourceName)
  expect(firstName).toEqual("")
  expect(lastName).toEqual("")
  expect(primaryPhoneNumber).toEqual("")
  expect(secondaryPhoneNumber).toEqual("")
  expect(email).toEqual("")
  expect(firstAddressLine).toEqual("")
  expect(secondAddressLine).toEqual("")
  expect(note).toEqual("")
})

test("input with all fields maps correctly", () => {
  const input = {
    ...commonInput,
    names: [
      {
        metadata: {
          primary: true,
          source: {
            type: "CONTACT",
            id: "4b3a68250d7520cd",
          },
        },
        displayNameLastFirst,
      },
    ],
    addresses: [
      {
        metadata: {
          primary: true,
          source: {
            type: "CONTACT",
            id: "4b3a68250d7520cd",
          },
        },
        ...inputAddress,
      },
    ],
    emailAddresses: [
      {
        metadata: {
          primary: true,
          source: {
            type: "CONTACT",
            id: "4b3a68250d7520cd",
          },
        },
        value: exampleMail,
      },
    ],
    phoneNumbers: [
      {
        metadata: {
          primary: true,
          source: {
            type: "CONTACT",
            id: "4b3a68250d7520cd",
          },
        },
        value: examplePrimaryPhoneNumber,
      },
      {
        metadata: {
          source: {
            type: "CONTACT",
            id: "4b3a68250d7520cd",
          },
        },
        value: exampleSecondaryPhoneNumber,
      },
    ],
    biographies: [
      {
        metadata: {
          primary: true,
          source: {
            type: "CONTACT",
            id: "4b3a68250d7520cd",
          },
        },
        value: exampleNote,
        contentType: "TEXT_PLAIN",
      },
    ],
  }
  const {
    id,
    firstName,
    lastName,
    firstAddressLine,
    secondAddressLine,
    email,
    note,
    primaryPhoneNumber,
    secondaryPhoneNumber,
  } = mapContact(input)
  expect(id).toEqual(commonInput.resourceName)
  expect(firstName).toEqual("John")
  expect(lastName).toEqual("Doe")
  expect(firstAddressLine).toEqual(inputAddress.streetAddress)
  expect(secondAddressLine).toEqual(
    `${inputAddress.postalCode} ${inputAddress.city} ${inputAddress.extendedAddress}`
  )
  expect(email).toEqual(exampleMail)
  expect(note).toEqual(exampleNote)
  expect(primaryPhoneNumber).toEqual(primaryPhoneNumber)
  expect(secondaryPhoneNumber).toEqual(secondaryPhoneNumber)
})

test("third number from gogole is omitted", () => {
  const thirdPhoneNumberFromGoogle = "111 222 333"
  const input: GoogleContactResourceItem = {
    ...commonInput,
    phoneNumbers: [
      {
        metadata: {
          primary: true,
          source: {
            type: "CONTACT",
            id: "4b3a68250d7520cd",
          },
        },
        value: examplePrimaryPhoneNumber,
      },
      {
        metadata: {
          source: {
            type: "CONTACT",
            id: "4b3a68250d7520cd",
          },
        },
        value: exampleSecondaryPhoneNumber,
      },
      {
        metadata: {
          source: {
            type: "CONTACT",
            id: "4b3a68250d7520cd",
          },
        },
        value: thirdPhoneNumberFromGoogle,
      },
    ],
  }
  const { primaryPhoneNumber, secondaryPhoneNumber } = mapContact(input)
  expect(primaryPhoneNumber).toEqual(primaryPhoneNumber)
  expect(secondaryPhoneNumber).toEqual(secondaryPhoneNumber)
  expect(primaryPhoneNumber).not.toEqual(thirdPhoneNumberFromGoogle)
  expect(secondaryPhoneNumber).not.toEqual(thirdPhoneNumberFromGoogle)
})

test("secondary phone number is empty when there is only one phone number", () => {
  const primaryPhoneNumber = "123 456 999"
  const input: GoogleContactResourceItem = {
    resourceName: "people/c5420759609842671821",
    etag: "%EgwBAj0FCT4LPxBANy4aBAECBQciDEE1VzVERlU4NjljPQ==",
    phoneNumbers: [
      {
        metadata: {
          primary: true,
          source: {
            type: "CONTACT",
            id: "4b3a68250d7520cd",
          },
        },
        value: primaryPhoneNumber,
      },
    ],
  }
  const result = mapContact(input)
  expect(result.primaryPhoneNumber).toEqual(primaryPhoneNumber)
  expect(result.secondaryPhoneNumber).toEqual("")
})
