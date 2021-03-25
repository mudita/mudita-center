/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import DeviceManager, { PureDevice } from "@mudita/pure"

let phone: PureDevice

beforeAll(async () => {
  const [device] = await DeviceManager.getDevices()
  phone = device
  if (!phone) {
    throw new Error("Your phone is not connected or was not recognised.")
  }
  await phone.connect()
})

afterAll(async () => {
  await phone.disconnect()
})

describe("Contacts", () => {
  let contactCreationResponse: any
  const contact = {
    address: "6 Czeczota St.\n 02600 Warsaw",
    altName: "Turk",
    blocked: true,
    favourite: true,
    numbers: ["724832287"],
    priName: "Tolek",
  }
  describe("POST", () => {
    beforeAll(async () => {
      contactCreationResponse = await phone.request({
        endpoint: 7,
        method: 3,
        body: contact,
      })
    })
    test("POST response snapshot", () => {
      expect(contactCreationResponse).toMatchInlineSnapshot(
        {
          uuid: expect.any(Number),
          body: {
            id: expect.any(String),
          },
        },
        `
          Object {
            "body": Object {
              "id": Any<String>,
            },
            "endpoint": 7,
            "status": 200,
            "uuid": Any<Number>,
          }
        `
      )
    })
  })

  describe("GET", () => {
    let getResponse: any
    beforeAll(async () => {
      getResponse = await phone.request({
        endpoint: 7,
        method: 1,
        body: {
          id: Number(contactCreationResponse.body.id),
        },
      })
    })

    test("GET response snapshot", () => {
      expect(getResponse).toMatchInlineSnapshot(
        {
          uuid: expect.any(Number),
          body: {
            id: expect.any(Number),
          },
        },
        `
          Object {
            "body": Object {
              "address": "6 Czeczota St.
           02600 Warsaw",
              "altName": "Turk",
              "blocked": true,
              "favourite": true,
              "id": Any<Number>,
              "numbers": Array [
                "724832287",
              ],
              "priName": "Tolek",
            },
            "endpoint": 7,
            "status": 200,
            "uuid": Any<Number>,
          }
        `
      )
    })

    test("response body is the same as post body", () => {
      expect(getResponse.body).toStrictEqual({
        ...contact,
        id: Number(contactCreationResponse.body.id),
      })
    })
  })
})
