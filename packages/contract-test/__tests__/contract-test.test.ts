/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import DeviceManager, { Endpoint, Method, PureDevice } from "@mudita/pure"
import fs from "fs-extra"

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
      await fs.writeJSON("test.json", response)
      expect(response.status).toEqual(200)
    })
  })

  describe("Device Info", () => {
    let response: any
    beforeAll(async () => {
      response = await phone.request({
        endpoint: Endpoint.DeviceInfo,
        method: Method.Get,
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
          endpoint: Endpoint.Contacts,
          method: Method.Put,
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
          endpoint: Endpoint.Contacts,
          method: Method.Get,
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
          endpoint: Endpoint.Contacts,
          method: Method.Delete,
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
          endpoint: Endpoint.Contacts,
          method: Method.Post,
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

  describe("Messages", () => {
    test("GET", async () => {
      const response = await phone.request({
        endpoint: Endpoint.Messages,
        method: Method.Get,
        body: { category: "thread", limit: 15 },
      })
      expect(response.status).toEqual(200)
      response.body.entries.forEach(
        ({
          contactID,
          isUnread,
          lastUpdatedAt,
          messageCount,
          messageSnippet,
          messageType,
          numberID,
          threadID,
        }: any) => {
          expect(typeof contactID).toEqual("number")
          expect(typeof isUnread).toEqual("boolean")
          expect(typeof lastUpdatedAt).toEqual("number")
          expect(typeof messageCount).toEqual("number")
          expect(typeof messageSnippet).toEqual("string")
          expect(typeof messageType).toEqual("number")
          expect(typeof numberID).toEqual("number")
          expect(typeof threadID).toEqual("number")
        }
      )
    })
  })
})
