import { E2EMockClient } from "../../../../../libs/e2e-mock/client/src"
import {
  overviewDataWithOneSimCard,
  overviewDataWithOneSimCard2nd,
} from "../../../../../libs/e2e-mock/responses/src"
import OverviewPage from "../../page-objects/overview.page"
import OverviewKompaktPage from "../../page-objects/overview-kompakt.page"
import HomePage from "../../page-objects/home.page"
import tabsPage from "../../page-objects/tabs.page"
import { kompaktImageRegex } from "../../consts/regex-const"
import overviewPage from "../../page-objects/overview.page"
import drawerPage from "../../page-objects/drawer.page"

describe("E2E mock sample - overview view", () => {
  const firstSerialNumber = "first-serial-number"
  const secondSerialNumber = "second-serial-number"

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
    E2EMockClient.mockResponse({
      path: "path-1",
      body: overviewDataWithOneSimCard,
      endpoint: "FEATURE_DATA",
      method: "GET",
      status: 200,
    })
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
    await expect(kompaktImage).toBeDisplayed
    console.log(kompaktImage)
    await expect(kompaktImage).toHaveAttribute("src", kompaktImageRegex)

    const kompaktOsVersion = await OverviewKompaktPage.kompaktOsVersion
    await expect(kompaktOsVersion).toBeDisplayed

    const kompaktSimCard1 = await OverviewKompaktPage.kompaktSimCard1
    await expect(kompaktSimCard1).toBeDisplayed
    const sim1: string = "SIM 1"
    const simInfo: string = sim1
  })

  it("Connect 2nd device", async () => {
    E2EMockClient.mockResponse({
      path: "path-2",
      body: overviewDataWithOneSimCard2nd,
      endpoint: "FEATURE_DATA",
      method: "GET",
      status: 200,
    })
    E2EMockClient.addDevice({
      path: "path-2",
      serialNumber: secondSerialNumber,
    })

    await browser.pause(6000)
    const menuItem = await $(`//a[@href="#/generic/mc-overview"]`)

    await menuItem.waitForDisplayed({ timeout: 10000 })
    await expect(menuItem).toBeDisplayed()
  })

  it("Check Drawer Modal and Switch to 2nd device", async () => {
    const deviceSelectDrawer = await drawerPage.deviceSelectDrawer
    await expect(deviceSelectDrawer).toBeDisplayed()

    const deviceImageOnDrawer = await drawerPage.deviceImageOnDrawer
    await expect(deviceImageOnDrawer).toBeDisplayed()

    const firstDeviceOnDrawer = await drawerPage.getDeviceOnDrawer(
      firstSerialNumber
    )
    await expect(firstDeviceOnDrawer).toBeDisplayed()
    const secondDeviceOnDrawer = await drawerPage.getDeviceOnDrawer(
      secondSerialNumber
    )
    await expect(secondDeviceOnDrawer).toBeDisplayed()
    await secondDeviceOnDrawer.waitForClickable()
    await secondDeviceOnDrawer.click()
  })

  it("Verify Overview Page for 2nd device", async () => {
    const kompaktImage = await OverviewKompaktPage.kompaktImage
    await expect(kompaktImage).toBeDisplayed
    console.log(kompaktImage)
    await expect(kompaktImage).toHaveAttribute("src", kompaktImageRegex)

    const kompaktOsVersion = await OverviewKompaktPage.kompaktOsVersion
    await expect(kompaktOsVersion).toBeDisplayed

    const kompaktSimCard1 = await OverviewKompaktPage.kompaktSimCard1
    await expect(kompaktSimCard1).toBeDisplayed
    const sim1: string = "SIM 1"
    const simInfo: string = sim1
  })

  it("Verify Select Connected Devices, click on it and select 1st Kompakt", async () => {
    const selectConnectedDevices = await overviewPage.selectConnectedDevices
    await selectConnectedDevices.waitForClickable()
    await expect(selectConnectedDevices).toHaveTextContaining("2")
    await selectConnectedDevices.click()

    const firstDeviceOnDrawer = await drawerPage.getDeviceOnDrawer(
      firstSerialNumber
    )
    await expect(firstDeviceOnDrawer).toBeDisplayed()
    await firstDeviceOnDrawer.waitForClickable()
    await firstDeviceOnDrawer.click()
  })

  it("Disconnect the devices and check if Welcome Page is present", async () => {
    E2EMockClient.removeDevice("path-1")
    E2EMockClient.removeDevice("path-2")

    const homeHeader = await HomePage.homeHeader
    await homeHeader.waitForDisplayed()
  })
})
