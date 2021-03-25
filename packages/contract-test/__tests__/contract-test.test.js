const DeviceManager = require("@mudita/pure").default
const BaseDevice = require("@mudita/pure").BaseDevice
// jest.mock("@mudita/pure").BaseDevice

describe("contract-test", () => {
  let phone

  beforeAll(async () => {
    jest
      .spyOn(BaseDevice.prototype, "handleRequestQueue")
      .mockImplementation(() => {})
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
            signalStrength: expect.any(String),
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
                  "signalStrength": Any<String>,
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

  describe("Contacts", () => {
    let contactCreationResponse
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
      test("works", () => {
        expect(contactCreationResponse).toMatchInlineSnapshot(
          {
            uuid: expect.any(String),
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
            "uuid": Any<String>,
          }
        `
        )
      })
    })

    describe("GET", () => {
      let getResponse
      beforeAll(async () => {
        getResponse = await phone.request({
          endpoint: 7,
          method: 1,
          body: {
            id: Number(contactCreationResponse.body.id),
          },
        })
      })

      test("getResponse 12321", () => {
        expect(getResponse).toMatchInlineSnapshot(
          {
            uuid: expect.any(String),
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
            "uuid": Any<String>,
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
})
