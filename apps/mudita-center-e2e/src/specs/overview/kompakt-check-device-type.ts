import { E2EMockClient } from "../../../../../libs/e2e-mock/client/src"
import {
  overviewDataWithOneSimCard,
  overviewDataWithOneSimCard2nd,
} from "../../../../../libs/e2e-mock/responses/src"
import OverviewKompaktPage from "../../page-objects/overview-kompakt.page"
import drawerPage from "../../page-objects/drawer.page"

describe("Check Device type", () => {
  const firstSerialNumber = "KOM1234567890"
  const secondSerialNumber = "KOM1234567892"
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

  it("Connect device 1st - GLOBAL", async () => {
    E2EMockClient.mockResponses([
      {
        path: "path-1",
        body: overviewDataWithOneSimCard,
        endpoint: "FEATURE_DATA",
        method: "GET",
        status: 200,
      },
    ])
    E2EMockClient.addDevice({
      path: "path-1",
      serialNumber: firstSerialNumber,
    })

    await browser.pause(6000)
    const menuItem = await $(`//a[@href="#/generic/mc-overview"]`)

    await menuItem.waitForDisplayed({ timeout: 10000 })
    await expect(menuItem).toBeDisplayed()
  })

  it("Verify Device type - GLOBAL", async () => {
    const kompaktDeviceTypeLabel =
      await OverviewKompaktPage.kompaktDeviceTypeLabel
    await expect(kompaktDeviceTypeLabel).toBeDisplayed()
    await expect(kompaktDeviceTypeLabel).toHaveText("Device type:")

    const kompaktDeviceTypeLabelValue1st =
      await OverviewKompaktPage.kompaktDeviceTypeLabelValue1st
    await expect(kompaktDeviceTypeLabelValue1st).toBeDisplayed()
    await expect(kompaktDeviceTypeLabelValue1st).toHaveText("GLOBAL")
  })

  it("Connect device 2nd - US", async () => {
    E2EMockClient.mockResponses([
      {
        path: "path-2",
        body: overviewDataWithOneSimCard2nd,
        endpoint: "FEATURE_DATA",
        method: "GET",
        status: 200,
      },
    ])
    E2EMockClient.addDevice({
      path: "path-2",
      serialNumber: secondSerialNumber,
    })

    await browser.pause(6000)
    const menuItem = await $(`//a[@href="#/generic/mc-overview"]`)

    await menuItem.waitForDisplayed({ timeout: 10000 })
    await expect(menuItem).toBeDisplayed()
  })

  it("Switch to 2nd device and Verify Device type - US", async () => {
    const secondDeviceOnDrawer = await drawerPage.getDeviceOnDrawer(
      secondSerialNumber
    )
    await expect(secondDeviceOnDrawer).toBeDisplayed()
    await secondDeviceOnDrawer.waitForClickable()
    await secondDeviceOnDrawer.click()
    const kompaktDeviceTypeLabel =
      await OverviewKompaktPage.kompaktDeviceTypeLabel
    await expect(kompaktDeviceTypeLabel).toBeDisplayed()
    await expect(kompaktDeviceTypeLabel).toHaveText("Device type:")

    const kompaktDeviceTypeLabelValue2nd =
      await OverviewKompaktPage.kompaktDeviceTypeLabelValue2nd
    await expect(kompaktDeviceTypeLabelValue2nd).toBeDisplayed()
    await expect(kompaktDeviceTypeLabelValue2nd).toHaveText("US")
  })
})
