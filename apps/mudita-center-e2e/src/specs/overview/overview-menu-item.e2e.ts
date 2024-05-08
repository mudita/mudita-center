import {
  outboxReloadOverview,
  overviewDataWithoutBadge,
} from "../../../../../libs/e2e-mock/responses/src"
import { E2EMockClient } from "../../../../../libs/e2e-mock/client/src"
// import { ResponseStatus } from "../../../../../libs/core/device"

describe("Overview Menu Item", () => {
  before(async () => {
    await browser.waitUntil(() => E2EMockClient.checkConnection())

    // E2EMockClient.mockResponse({
    //   path: "path-1",
    //   body: overviewOnlineConfig,
    //   endpoint: "FEATURE_CONFIGURATION",
    //   method: "GET",
    //   status: 200,
    // })

    // E2EMockClient.mockResponse({
    //   path: "path-1",
    //   body: overviewOnlineData,
    //   endpoint: "FEATURE_DATA",
    //   method: "GET",
    //   status: 200,
    // })

    E2EMockClient.addDevice({
      path: "path-1",
      serialNumber: "first-serial-number",
    })
    await browser.pause(6000)
  })
  it("Overview menu item is displayed", async () => {
    const menuItem = await $(`//a[@href="#/generic/mc-overview"]`)

    await menuItem.waitForDisplayed({ timeout: 10000 })
    await browser.pause(10000)
    await expect(menuItem).toBeDisplayed()

    //     E2EMockClient.mockResponse({
    //   path: "path-1",
    //   body: overviewOnlineConfig,
    //   endpoint: "FEATURE_CONFIGURATION",
    //   method: "GET",
    //   status: 200,
    // })

    E2EMockClient.mockResponse({
      path: "path-1",
      body: overviewDataWithoutBadge,
      endpoint: "FEATURE_DATA",
      method: "GET",
      status: 200,
    })

    E2EMockClient.mockResponseOnce({
      path: "path-1",
      body: outboxReloadOverview,
      endpoint: "OUTBOX",
      method: "GET",
      status: 200,
    })

    await browser.pause(10000)
  })
  // it("Overview menu item is displayed second", async () => {
  //   E2EMockClient.addDevice({
  //     path: "path-2",
  //     serialNumber: "new-serial-number",
  //   })
  //   await browser.pause(6000)

  //   const menuItem = await $(`//a[@href="#/generic/mc-overview"]`)

  //   await expect(menuItem).toBeDisplayed()
  // })
})
