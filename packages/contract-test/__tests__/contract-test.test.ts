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
      const { status } = await phone.connect()
      expect(status).toEqual(200)
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
})
