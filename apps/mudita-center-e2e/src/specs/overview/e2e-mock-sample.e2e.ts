import { E2EMockClient } from "../../../../../libs/e2e-mock/client/src"
import { outboxReloadOverview } from "../../../../../libs/e2e-mock/responses/src"
import { mockResponseTomasz } from "../../consts/mockresponse-const"
import screenshotHelper from "../../helpers/screenshot.helper"

describe("E2E mock sample - overview view", () => {
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

  it("Test Tomasz #1 - addDevice", async () => {
    E2EMockClient.addDevice({
      path: "path-1",
      serialNumber: "FLL700000029",
    })

    await browser.pause(15000)
    const menuItem = await $(`//a[@href="#/generic/mc-overview"]`)

    await menuItem.waitForDisplayed({ timeout: 10000 })
    await expect(menuItem).toBeDisplayed()
  })
  it("Test Tomasz #2 - mockDevice Response", async () => {
    const badge = $(`//p[contains(text(), 'Offline')]`)

    await badge.waitForDisplayed()
    await expect(badge).toBeDisplayed()

    // overwrite default response for given device
    E2EMockClient.mockResponse({
      path: "path-1",
      body: mockResponseTomasz,
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

    await badge.waitForDisplayed({ reverse: true })
    screenshotHelper.makeViewScreenshot()
    await expect(badge).not.toBeDisplayed()
    await browser.pause(10000)
  })
})
