const DeviceManager = require("@mudita/pure").default

describe("contract-test", () => {
  let phone

  beforeAll(async () => {
    const [device] = await DeviceManager.getDevices()
    phone = device
    if (!phone) {
      throw new Error("Your phone is not connected or was not recognised.")
    }
  })

  describe("device connection", () => {
    test("device connects", async () => {
      const { status } = await phone.connect()
      expect(status).toEqual(200)
    })
  })

  describe("Device Info", () => {
    let response
    beforeAll(async () => {
      response = await phone.request({
        endpoint: 1,
        method: 1,
      })
    })
    test("GET", () => {
      expect(response).toMatchInlineSnapshot(
        {
          uuid: expect.any(String),
          body: {
            batteryLevel: expect.any(String),
            currentRTCTime: expect.any(String),
          },
        },
        `
      Object {
        "body": Object {
          "accessTechnology": "255",
          "batteryLevel": Any<String>,
          "batteryState": "1",
          "currentRTCTime": Any<String>,
          "fsFree": "13879",
          "fsFreePercent": "100",
          "fsTotal": "13913",
          "gitBranch": "master",
          "gitRevision": "888744e",
          "gitTag": "release-0.52.1-35-g888744ee",
          "networkStatus": "0",
          "selectedSim": "4",
          "signalStrength": "3",
          "trayState": "1",
          "updateHistory": null,
        },
        "endpoint": 1,
        "status": 200,
        "uuid": Any<String>,
      }
    `
      )
    })
    test("battery level", () => {
      const level = Number(response.body.batteryLevel)
      expect(level).toEqual(expect.any(Number))
      expect(level).toBeGreaterThanOrEqual(0)
      expect(level).toBeLessThanOrEqual(100)
    })
  })
})
