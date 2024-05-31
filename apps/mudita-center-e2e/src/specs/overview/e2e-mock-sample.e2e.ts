import { E2EMockClient } from "../../../../../libs/e2e-mock/client/src"
import {
  outboxReloadOverview,
  overviewDataWithoutBadge,
} from "../../../../../libs/e2e-mock/responses/src"
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
    const badge = $(`//p[contains(text(), 'Offline')]`)

    await badge.waitForDisplayed()
    await expect(badge).toBeDisplayed()

    // overwrite default response for given device
    E2EMockClient.mockResponse({
      path: "path-1",
      body: overviewDataWithoutBadge,
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

  it("Add second device", async () => {
    E2EMockClient.addDevice({
      path: "path-2",
      serialNumber: "second-serial-number",
    })
    await browser.pause(6000)

    const drawerHeader = $(`//*[text()='Select a device']`)
    await drawerHeader.waitForDisplayed()
    await expect(drawerHeader).toBeDisplayed()
  })
  it("Remove first device", async () => {
    E2EMockClient.removeDevice("path-1")
    await browser.pause(6000)

    const badge = $(`//p[contains(text(), 'Offline')]`)

    await badge.waitForDisplayed()
    // Notice that the Status badge is once again visible, which proves that response overwrite works only for a given device.
    await expect(badge).toBeDisplayed()
    await browser.pause(4000)
  })
})
