import { E2EMockClient } from "../../../../../libs/e2e-mock/client/src"
import {
  overviewDataWithOneSimCard,
  overviewDataWithOneSimCard2nd,
  overviewDataWithOneSimCard3rd,
  overviewDataWithOneSimCard4th,
  overviewDataWithOneSimCard5th,
  overviewDataWithOneSimCard6th,
} from "../../../../../libs/e2e-mock/responses/src"
import OverviewKompaktPage from "../../page-objects/overview-kompakt.page"
import HomePage from "../../page-objects/home.page"
import { kompaktImageRegex } from "../../consts/regex-const"
import overviewPage from "../../page-objects/overview.page"
import drawerPage from "../../page-objects/drawer.page"

describe("Kompakt switching devices", () => {
  const firstSerialNumber = "KOM1234567890"
  const secondSerialNumber = "KOM1234567892"
  const thirdSerialNumber = "KOM1234567893"
  const fourthSerialNumber = "KOM1234567894"
  const fifthSerialNumber = "KOM1234567895"
  const sixthSerialNumber = "KOM1234567896"

  before(async () => {
    E2EMockClient.connect()
    await browser.waitUntil(() => {
      return E2EMockClient.checkConnection()
    })
  })

  after(() => {
    E2EMockClient.stopServer()
    E2EMockClient.disconnect()
  })

  it("Connect 1,2 Kompakt devices", async () => {
    const devices = [
      {
        path: "path-1",
        body: overviewDataWithOneSimCard,
        serialNumber: firstSerialNumber,
      },
      {
        path: "path-2",
        body: overviewDataWithOneSimCard2nd,
        serialNumber: secondSerialNumber,
      },
    ]

    for (const device of devices) {
      E2EMockClient.mockResponse({
        path: device.path,
        body: device.body,
        endpoint: "FEATURE_DATA",
        method: "GET",
        status: 200,
      })
      E2EMockClient.addDevice({
        path: device.path,
        serialNumber: device.serialNumber,
      })

      await browser.pause(6000)
    }
  })

  it("Check Drawer Modal and Switch to 1st device", async () => {
    const deviceSelectDrawer = await drawerPage.deviceSelectDrawer
    await expect(deviceSelectDrawer).toBeDisplayed()

    const deviceImageOnDrawer = await drawerPage.deviceImageOnDrawer
    await expect(deviceImageOnDrawer).toBeDisplayed()

    const firstDeviceOnDrawer = await drawerPage.getDeviceOnDrawer(
      firstSerialNumber
    )
    const secondDeviceOnDrawer = await drawerPage.getDeviceOnDrawer(
      secondSerialNumber
    )
    await expect(firstDeviceOnDrawer).toBeDisplayed()
    await firstDeviceOnDrawer.waitForClickable()
    await firstDeviceOnDrawer.click()
  })
  it("Verify Overview Page for 1st device", async () => {
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

  it("Connect 3,4,5,6 Kompakt devices", async () => {
    const devices = [
      {
        path: "path-3",
        body: overviewDataWithOneSimCard3rd,
        serialNumber: thirdSerialNumber,
      },
      {
        path: "path-4",
        body: overviewDataWithOneSimCard4th,
        serialNumber: fourthSerialNumber,
      },
      {
        path: "path-5",
        body: overviewDataWithOneSimCard5th,
        serialNumber: fifthSerialNumber,
      },
      {
        path: "path-6",
        body: overviewDataWithOneSimCard6th,
        serialNumber: sixthSerialNumber,
      },
    ]

    for (const device of devices) {
      E2EMockClient.mockResponse({
        path: device.path,
        body: device.body,
        endpoint: "FEATURE_DATA",
        method: "GET",
        status: 200,
      })
      E2EMockClient.addDevice({
        path: device.path,
        serialNumber: device.serialNumber,
      })

      await browser.pause(6000)
    }
  })

  it("Check Drawer Modal and Switch to 3rd device", async () => {
    const deviceSelectDrawer = await drawerPage.deviceSelectDrawer
    const thirdDeviceOnDrawer = await drawerPage.getDeviceOnDrawer(
      thirdSerialNumber
    )
    await expect(deviceSelectDrawer).toBeDisplayed()

    const deviceImageOnDrawer = await drawerPage.deviceImageOnDrawer
    await expect(deviceImageOnDrawer).toBeDisplayed()

    await expect(thirdDeviceOnDrawer).toBeDisplayed()

    await thirdDeviceOnDrawer.waitForClickable()
    await thirdDeviceOnDrawer.click()
  })
  it("Verify Overview Page for 3rd device", async () => {
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
    await expect(kompaktNetworkName).toHaveText("Orange")

    const kompaktBatteryLevelValue =
      await OverviewKompaktPage.kompaktBatteryLevelValue
    await expect(kompaktBatteryLevelValue).toBeDisplayed()
    await expect(kompaktBatteryLevelValue).toHaveText("60%")
  })

  it("Switch to 4th device", async () => {
    const fourthDeviceOnDrawer = await drawerPage.getDeviceOnDrawer(
      fourthSerialNumber
    )
    const selectConnectedDevices = await overviewPage.selectConnectedDevices
    await selectConnectedDevices.waitForClickable()
    await expect(selectConnectedDevices).toHaveText("6")
    await selectConnectedDevices.click()

    await expect(fourthDeviceOnDrawer).toBeDisplayed()
    await fourthDeviceOnDrawer.waitForClickable()
    await fourthDeviceOnDrawer.click()
  })

  it("Verify Overview Page for 4th device", async () => {
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
    await expect(kompaktNetworkName).toHaveText("O2")

    const kompaktBatteryLevelValue =
      await OverviewKompaktPage.kompaktBatteryLevelValue
    await expect(kompaktBatteryLevelValue).toBeDisplayed()
    await expect(kompaktBatteryLevelValue).toHaveText("80%")
  })

  it("Switch to 5th device", async () => {
    const fifthDeviceOnDrawer = await drawerPage.getDeviceOnDrawer(
      fifthSerialNumber
    )
    const selectConnectedDevices = await overviewPage.selectConnectedDevices
    await expect(selectConnectedDevices).toHaveText("6")
    await selectConnectedDevices.waitForClickable()
    await selectConnectedDevices.click()

    await expect(fifthDeviceOnDrawer).toBeDisplayed()
    await fifthDeviceOnDrawer.waitForClickable()
    await fifthDeviceOnDrawer.click()
  })

  it("Verify Overview Page for 5th device", async () => {
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
    await expect(kompaktNetworkName).toHaveText("Vodafone")

    const kompaktBatteryLevelValue =
      await OverviewKompaktPage.kompaktBatteryLevelValue
    await expect(kompaktBatteryLevelValue).toBeDisplayed()
    await expect(kompaktBatteryLevelValue).toHaveText("100%")
  })

  it("Switch to 6th device", async () => {
    const sixthDeviceOnDrawer = await drawerPage.getDeviceOnDrawer(
      sixthSerialNumber
    )
    const selectConnectedDevices = await overviewPage.selectConnectedDevices
    await expect(selectConnectedDevices).toHaveText("6")
    await selectConnectedDevices.waitForClickable()
    await selectConnectedDevices.click()

    await expect(sixthDeviceOnDrawer).toBeDisplayed()
    await sixthDeviceOnDrawer.waitForClickable()
    await sixthDeviceOnDrawer.click()
  })

  it("Verify Overview Page for 6th device", async () => {
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
    await expect(kompaktNetworkName).toHaveText("Telia")

    const kompaktBatteryLevelValue =
      await OverviewKompaktPage.kompaktBatteryLevelValue
    await expect(kompaktBatteryLevelValue).toBeDisplayed()
    await expect(kompaktBatteryLevelValue).toHaveText("20%")
  })

  it("Disconnect the devices and check if Welcome Page is present", async () => {
    E2EMockClient.removeDevice("path-1")
    E2EMockClient.removeDevice("path-2")
    E2EMockClient.removeDevice("path-3")
    E2EMockClient.removeDevice("path-4")
    E2EMockClient.removeDevice("path-5")
    E2EMockClient.removeDevice("path-6")

    const homeHeader = await HomePage.homeHeader
    await homeHeader.waitForDisplayed()
  })
})
