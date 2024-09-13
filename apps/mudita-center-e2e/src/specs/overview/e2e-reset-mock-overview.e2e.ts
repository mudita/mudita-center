import { E2EMockClient } from "../../../../../libs/e2e-mock/client/src"
import {
  outboxReloadOverview,
  overviewDataWithOneSimCard
} from "../../../../../libs/e2e-mock/responses/src"
import screenshotHelper from "../../helpers/screenshot.helper"

describe("E2E reset mock sample - overview view", () => {
  before(async () => {
    E2EMockClient.connect()
    //wait for a connection to be established
    await browser.waitUntil(() => {
      return E2EMockClient.checkConnection()
    })
  })

  after(() => {
    E2EMockClient.stopServer()
    E2EMockClient.disconnect()
  })

  it("Connect device", async () => {
    E2EMockClient.addDevice({
      path: "path-1",
      serialNumber: "first-serial-number",
    })

    await browser.pause(6000)
    const menuItem = await $(`//a[@href="#/generic/mc-overview"]`)

    await menuItem.waitForDisplayed({ timeout: 10000 })
    await expect(menuItem).toBeDisplayed()
  })

  it("Overwrite device response", async () => {

    // overwrite default response for given device
    E2EMockClient.mockResponse({
      path: "path-1",
      body: overviewDataWithOneSimCard,
      endpoint: "FEATURE_DATA",
      method: "GET",
      status: 200,
    })
    // overwrite newest response for given device
    E2EMockClient.mockResponseOnce({
      path: "path-1",
      body: outboxReloadOverview,
      endpoint: "OUTBOX",
      method: "GET",
      status: 200,
    })
    

    await browser.pause(30000)
  })

  it("Reset mock", async () => {
    E2EMockClient.mockReset({
      path: "path-1",
      requests: [
        { endpoint: "FEATURE_DATA", method: "GET" },
        {
          endpoint: "FEATURE_CONFIGURATION",
          method: "GET",
        },
        {
          endpoint: "MENU_CONFIGURATION",
          method: "GET",
        },
        {
          endpoint: "OUTBOX",
          method: "GET",
        },
      ],
    })


    await browser.pause(30000)
  })

  it("Remove first device", async () => {
    E2EMockClient.removeDevice("path-1")
    await browser.pause(6000)
  })
})
