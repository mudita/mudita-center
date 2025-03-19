import { E2EMockClient } from "../../../../../libs/e2e-mock/client/src"
import {
  overviewDataWithOneSimCard,
  overviewDataWithOneSimCard2nd,
} from "../../../../../libs/e2e-mock/responses/src"
import OverviewKompaktPage from "../../page-objects/overview-kompakt.page"
import HomePage from "../../page-objects/home.page"
import { kompaktImageRegex } from "../../consts/regex-const"
import overviewPage from "../../page-objects/overview.page"
import drawerPage from "../../page-objects/drawer.page"

describe("Kompakt switching devices", () => {
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

  it("Connect device", async () => {
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

  it("Verify Overview Page", async () => {
    const kompaktImage = await OverviewKompaktPage.kompaktImage
    await expect(kompaktImage).toBeDisplayed()
    await expect(kompaktImage).toHaveAttribute("src", kompaktImageRegex)

    const kompaktOsVersion = await OverviewKompaktPage.kompaktOsVersion
    await expect(kompaktOsVersion).toBeDisplayed()

    const kompaktSimCard1Subtext =
      await OverviewKompaktPage.kompaktSimCard1Subtext
    await expect(kompaktSimCard1Subtext).toHaveText("SIM 1")

    const kompaktNetworkName = await OverviewKompaktPage.kompaktNetworkName
    await expect(kompaktNetworkName).toBeDisplayed()
    await expect(kompaktNetworkName).toHaveText("T-Mobile")

    const kompaktBatteryLevelValue =
      await OverviewKompaktPage.kompaktBatteryLevelValue
    await expect(kompaktBatteryLevelValue).toBeDisplayed()
    await expect(kompaktBatteryLevelValue).toHaveText("100%")
  })

  it("Connect 2nd device", async () => {
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
  })

  it("Switch to 2nd device", async () => {
    const secondDeviceOnDrawer = await drawerPage.getDeviceOnDrawer(
      secondSerialNumber
    )
    await expect(secondDeviceOnDrawer).toBeDisplayed()
    await secondDeviceOnDrawer.waitForClickable()
    await secondDeviceOnDrawer.click()
  })

  it("Verify Overview Page for 2nd device", async () => {
    const kompaktImage = await OverviewKompaktPage.kompaktImage
    await expect(kompaktImage).toBeDisplayed()
    await expect(kompaktImage).toHaveAttribute("src", kompaktImageRegex)

    const kompaktOsVersion = await OverviewKompaktPage.kompaktOsVersion
    await expect(kompaktOsVersion).toBeDisplayed()

    const kompaktSimCard1Subtext =
      await OverviewKompaktPage.kompaktSimCard1Subtext
    await expect(kompaktSimCard1Subtext).toHaveText("SIM 1")

    const kompaktNetworkName = await OverviewKompaktPage.kompaktNetworkName
    await expect(kompaktNetworkName).toBeDisplayed()
    await expect(kompaktNetworkName).toHaveText("Play")

    const kompaktBatteryLevelValue =
      await OverviewKompaktPage.kompaktBatteryLevelValue
    await expect(kompaktBatteryLevelValue).toBeDisplayed()
    await expect(kompaktBatteryLevelValue).toHaveText("40%")
  })
})
