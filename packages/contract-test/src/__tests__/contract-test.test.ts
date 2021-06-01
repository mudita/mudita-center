/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import DeviceManager, {
  PureDevice,
  Contact,
  DeviceInfo,
  Response,
} from "@mudita/pure"

describe("Contract tests", () => {
  let device: PureDevice
  beforeAll(async () => {
    device = (await DeviceManager.getDevices())[0]
    if (!device) {
      throw new Error("Your device is not connected or was not recognised.")
    }
  })

  afterAll(async () => {
    await device.disconnect()
  })

  describe("Device connection", () => {
    test("Device connects", async () => {
      const response = await device.connect()
      expect(response.status).toEqual(200)
    })
  })

  describe("Device Info", () => {
    let response: Response<DeviceInfo>
    beforeAll(async () => {
      response = await device.request({
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
    test("Battery level has to be between 0 and 100", () => {
      const level = Number(response.body?.batteryLevel)
      expect(level).toEqual(expect.any(Number))
      expect(level).toBeGreaterThanOrEqual(0)
      expect(level).toBeLessThanOrEqual(100)
    })
  })

  describe("Contacts", () => {
    let contactCreationResponse: Response<Contact>
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
        contactCreationResponse = await device.request({
          endpoint: 7,
          method: 3,
          body: contact,
        })
      })
      test("POST response snapshot", () => {
        expect(contactCreationResponse).toMatchInlineSnapshot(
          {
            body: {
              id: expect.any(Number),
            },
            uuid: expect.any(Number),
          },
          `
          Object {
            "body": Object {
              "id": Any<Number>,
            },
            "endpoint": 7,
            "status": 200,
            "uuid": Any<Number>,
          }
        `
        )
      })
    })

    describe("GET for all contacts", () => {
      test("Contacts are successfully requested ", async () => {
        const response = await device.request({
          endpoint: 7,
          method: 1,
        })
        expect(response.status).toEqual(200)
      })

      test("Response has correct structure", async () => {
        const response = await device.request({
          endpoint: 7,
          method: 1,
        })

        response.body.entries.forEach(
          ({
            address,
            altName,
            blocked,
            favourite,
            id,
            numbers,
            priName,
          }: Contact) => {
            expect(address).toBeString()
            expect(altName).toBeString()
            expect(blocked).toBeBoolean()
            expect(favourite).toBeBoolean()
            expect(id).toBeNumber()
            expect(numbers).toBeArray()
            numbers.forEach((number: string) => expect(number).toBeString())
            expect(priName).toBeString()
          }
        )
      })
    })

    describe("GET for a single contact", () => {
      let getResponse: Response<Contact>
      beforeAll(async () => {
        getResponse = await device.request({
          endpoint: 7,
          method: 1,
          body: {
            id: Number(contactCreationResponse.body?.id),
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

      test("Response body is the same as post body", () => {
        expect(getResponse.body).toStrictEqual({
          ...contact,
          id: Number(contactCreationResponse.body?.id),
        })
      })
    })

    describe("DELETE", () => {
      let deleteResponse: Response<Contact["id"]>
      test("Contact is successfully deleted", async () => {
        deleteResponse = await device.request({
          endpoint: 7,
          method: 4,
          body: {
            id: Number(contactCreationResponse.body?.id),
          },
        })
        expect(deleteResponse.status).toEqual(200)
      })

      test("Delete response snapshot", () => {
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

    describe("PUT", () => {
      let putResponse: Response<Contact>
      test("Contact is edited successfully", async () => {
        putResponse = await device.request({
          endpoint: 7,
          method: 2,
          body: {
            ...contactCreationResponse.body,
            firstName: "John",
          },
        })
        expect(putResponse.status).toEqual(200)
      })

      test("Put response snapshot", () => {
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
  /*
  TODO:Since this is readonly for now, tests assumes that Pure has at least one thread with messages inside.
  When CRUD becomes available, add tests that first create a thread and then check other actions, like it was done in Contacts.
   */
  describe("Messages", () => {
    let response: any
    test("GET threads", async () => {
      response = await device.request({
        endpoint: 8,
        method: 1,
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
          expect(contactID).toBeNumber()
          expect(isUnread).toBeBoolean()
          expect(lastUpdatedAt).toBeNumber()
          expect(messageCount).toBeNumber()
          expect(messageSnippet).toBeString()
          expect(messageType).toBeNumber()
          expect(numberID).toBeNumber()
          expect(threadID).toBeNumber()
        }
      )
    })

    test("GET thread by ID ", async () => {
      const threadId = response.body.entries[0].threadID
      const getThreadByIdResponse = await device.request({
        endpoint: 8,
        method: 1,
        body: {
          category: "message",
          threadId,
          offset: 0,
          limit: 6,
        },
      })
      expect(getThreadByIdResponse.status).toEqual(200)
      getThreadByIdResponse.body.entries.forEach((entry: any) => {
        expect(entry.contactID).toBeNumber()
        expect(entry.messageBody).toBeString()
        expect(entry.messageID).toBeNumber()
        expect(entry.messageType).toBeNumber()
        expect(entry.receivedAt).toBeNumber()
        expect(entry.createdAt).toBeNumber()
        expect(entry.threadID).toBeNumber()
      })
    })
  })
})
