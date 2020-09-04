import { messagesSeed } from "App/seeds/messages"
import { phoneSeed } from "App/seeds/phone"

import {
  expandTopic,
  getContactDetails,
} from "Renderer/models/messages/utils/messages.helpers"

const contactsMock = {
  "0": {
    id: "0",
    firstName: "Sławomir",
    lastName: "Borewicz",
    primaryPhoneNumber: "+71 195 069 214",
    secondaryPhoneNumber: "",
    email: "milicjant@buziaczek.pl",
    note: "sapiente rem dignissimos sunt",
    ice: false,
    favourite: false,
    blocked: false,
    firstAddressLine: "Malczewskiego 3, Warszawa",
    secondAddressLine: "",
  },
  "274970a2-13b7-4f42-962d-8fa0b2b48377": {
    id: "274970a2-13b7-4f42-962d-8fa0b2b48377",
    firstName: "",
    lastName: "",
    primaryPhoneNumber: "+71 195 069 214",
    secondaryPhoneNumber: "",
    email: "Lavina_Bartoletti@yahoo.com",
    note: "sapiente rem dignissimos sunt",
    ice: true,
    favourite: false,
    blocked: true,
    firstAddressLine: "3284 Klocko Plains",
    secondAddressLine: "",
  },
  "a664baed-09be-4698-b9ea-69849986b055": {
    id: "a664baed-09be-4698-b9ea-69849986b055",
    firstName: "",
    lastName: "",
    primaryPhoneNumber: "",
    secondaryPhoneNumber: "",
    email: "Crystel_Prosacco@yahoo.com",
    note: "voluptatem expedita vel",
    ice: false,
    favourite: false,
    blocked: false,
    firstAddressLine: "55727 Kelly Expressway",
    secondAddressLine: "",
  },
}

const testUser = phoneSeed.db[0]

test("properly returns contact data", () => {
  // @ts-ignore
  const testUserData = contactsMock[testUser.id]
  expect(getContactDetails(testUser.id, contactsMock)).toMatchObject(
    testUserData
  )
})

test("returns `undefined` when contact doesn't exist", () => {
  expect(getContactDetails("non-existent-id", contactsMock)).toBeUndefined()
})

test("properly places caller data within conversation", () => {
  const author = "TEST AUTHOR"
  const result =
    // @ts-ignore
    expandTopic(messagesSeed.topics[0], contactsMock, () => author)

  expect(
    result.messages.every(
      (item) => ((item.author as unknown) as string) === author
    )
  ).toBeTruthy()
})
