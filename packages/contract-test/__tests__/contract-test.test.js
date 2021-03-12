const DeviceManager = require("@mudita/pure").default

describe("contract-test", () => {
  let phone

  beforeAll(() => {
    return DeviceManager.getDevices().then(devices => {
      phone = devices[0]
      if (!phone) {
        throw new Error("Your phone is not connected or was not recognised.")
      }
    })
  })

  describe("Device Info", () => {
    test("GET", () => {
      return phone.request({
        endpoint: 1,
        method: 1
      }).then(response => {
        expect(response).toMatchInlineSnapshot({
          uuid: expect.any(Number)
        },`
        Object {
          "status": 200,
          "uuid": 1,
          "method": 1,
          "body": Object {
            "networkStatus": "1",
            "selectedSim": "0",
            "signalStrength": "5",
          }
        }
      `)
      })
    })
  })
})
