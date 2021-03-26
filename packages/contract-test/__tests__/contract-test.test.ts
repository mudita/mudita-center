/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import DeviceManager, { PureDevice } from "@mudita/pure"

describe("contract-test", () => {
  let phone: PureDevice

  beforeAll(async () => {
    const [device] = await DeviceManager.getDevices()
    phone = device
    if (!phone) {
      throw new Error("Your phone is not connected or was not recognised.")
    }
  })

  afterAll(async () => {
    await phone.disconnect()
  })

  describe("device connection", () => {
    test("device connects", async () => {
      const response = await phone.connect()
      expect(response.status).toEqual(200)
    })
  })

  describe("Device Info", () => {
    let response: any
    beforeAll(async () => {
      response = await phone.request({
        endpoint: 1,
        method: 1,
      })
    })
    test("GET request", () => {
      expect(response).toMatchInlineSnapshot(
        {
          uuid: expect.any(Number),
          body: {
            batteryLevel: expect.any(String),
            batteryState: expect.any(String),
            currentRTCTime: expect.any(String),
            fsFree: expect.any(String),
            fsFreePercent: expect.any(String),
            fsTotal: expect.any(String),
            signalStrength: expect.any(String),
            selectedSim: expect.any(String),
          },
        },
        `
        Object {
          "body": Object {
            "accessTechnology": "255",
            "batteryLevel": Any<String>,
            "batteryState": Any<String>,
            "currentRTCTime": Any<String>,
            "fsFree": Any<String>,
            "fsFreePercent": Any<String>,
            "fsTotal": Any<String>,
            "gitBranch": "EGD-6104-Fix_Pure_MC_communication",
            "gitRevision": "6ee9543b9",
            "gitTag": "release-0.59.1-rc4-18-g6ee9543b9",
            "networkStatus": "0",
            "selectedSim": Any<String>,
            "signalStrength": Any<String>,
            "trayState": "1",
            "updateHistory": null,
            "version": "0.59.1",
          },
          "endpoint": 1,
          "status": 200,
          "uuid": Any<Number>,
        }
      `
      )
    })
    test("battery level has to be between 0 and 100", () => {
      const level = Number(response.body.batteryLevel)
      expect(level).toEqual(expect.any(Number))
      expect(level).toBeGreaterThanOrEqual(0)
      expect(level).toBeLessThanOrEqual(100)
    })
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
    describe("POST (which in pure API is PUT)", () => {
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

    describe("DELETE", () => {
      let deleteResponse: any
      test("contact is successfully deleted", async () => {
        deleteResponse = await phone.request({
          endpoint: 7,
          method: 4,
          body: {
            id: Number(contactCreationResponse.body.id),
          },
        })
        expect(deleteResponse.status).toEqual(200)
      })

      test("delete response snapshot", () => {
        expect(deleteResponse).toMatchInlineSnapshot(
          {
            uuid: expect.any(Number),
          },
          `
          Object {
            "body": null,
            "endpoint": 7,
            "status": 200,
            "uuid": Any<Number>,
          }
        `
        )
      })
    })

    describe("PUT (which in pure API is POST)", () => {
      let putResponse: any
      test("contact is edited successfully", async () => {
        putResponse = await phone.request({
          endpoint: 7,
          method: 2,
          body: {
            ...contactCreationResponse.body,
            firstName: "John",
          },
        })
        expect(putResponse.status).toEqual(200)
      })

      test("put response snapshot", () => {
        expect(putResponse).toMatchInlineSnapshot(
          {
            uuid: expect.any(Number),
          },
          `
          Object {
            "body": null,
            "endpoint": 7,
            "status": 200,
            "uuid": Any<Number>,
          }
        `
        )
      })
    })
  })
})
