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

  it("Verify Devices 1 and 2 on Drawer and check their Serial Numbers", async () => {
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
    await expect(secondDeviceOnDrawer).toBeDisplayed()

    const drawerSerialNumbers = await drawerPage.drawerDeviceSerialNumber

    const devices = [
      { serialNumber: firstSerialNumber, index: 0 },
      { serialNumber: secondSerialNumber, index: 1 },
    ]

    for (const device of devices) {
      const deviceSerialNumber = await drawerSerialNumbers[
        device.index
      ].getText()
      await expect(deviceSerialNumber).toEqual(device.serialNumber)
    }
  })

  it("Connect 3rd Kompakt device", async () => {
    E2EMockClient.mockResponse({
      path: "path-3",
      body: overviewDataWithOneSimCard3rd,
      endpoint: "FEATURE_DATA",
      method: "GET",
      status: 200,
    })
    E2EMockClient.addDevice({
      path: "path-3",
      serialNumber: thirdSerialNumber,
    })

    await browser.pause(6000)
    const menuItem = await $(`//a[@href="#/generic/mc-overview"]`)

    await menuItem.waitForDisplayed({ timeout: 10000 })
    await expect(menuItem).toBeDisplayed()
  })

  it("Verify Device 3 on the Drawer and check the Serial Number", async () => {
    const deviceSelectDrawer = await drawerPage.deviceSelectDrawer
    await expect(deviceSelectDrawer).toBeDisplayed()

    const deviceImageOnDrawer = await drawerPage.deviceImageOnDrawer
    await expect(deviceImageOnDrawer).toBeDisplayed()

    const thirdDeviceOnDrawer = await drawerPage.getDeviceOnDrawer(
      thirdSerialNumber
    )

    await expect(thirdDeviceOnDrawer).toBeDisplayed()

    const drawerSerialNumbers = drawerPage.drawerDeviceSerialNumber

    const thirdDrawerDeviceSerialNumber = await drawerSerialNumbers[2].getText()
    await expect(thirdDrawerDeviceSerialNumber).toEqual(thirdSerialNumber)
  })

  it("Connect 4,5,6 Kompakt devices", async () => {
    const devices = [
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

  it("Verify Devices 4,5 and 6 on Drawer and check their Serial Numbers, scroll down and select 6th Kompakt", async () => {
    const deviceSelectDrawer = await drawerPage.deviceSelectDrawer
    await expect(deviceSelectDrawer).toBeDisplayed()

    const deviceImageOnDrawer = await drawerPage.deviceImageOnDrawer
    await expect(deviceImageOnDrawer).toBeDisplayed()

    const fourthDeviceOnDrawer = await drawerPage.getDeviceOnDrawer(
      fourthSerialNumber
    )
    const fifthDeviceOnDrawer = await drawerPage.getDeviceOnDrawer(
      fifthSerialNumber
    )
    const sixthDeviceOnDrawer = await drawerPage.getDeviceOnDrawer(
      sixthSerialNumber
    )
    await expect(fourthDeviceOnDrawer).toBeDisplayed()
    await expect(fifthDeviceOnDrawer).toBeDisplayed()
    await expect(sixthDeviceOnDrawer).toBeDisplayed()

    const drawerSerialNumbers = await drawerPage.drawerDeviceSerialNumber
    const drawerDeviceNames = await drawerPage.drawerDeviceName

    const devices = [
      { serialNumber: fourthSerialNumber, name: "Kompakt", index: 3 },
      { serialNumber: fifthSerialNumber, name: "Kompakt", index: 4 },
      { serialNumber: sixthSerialNumber, name: "Kompakt", index: 5 },
    ]

    for (const device of devices) {
      const deviceSerialNumber = await drawerSerialNumbers[
        device.index
      ].getText()
      await expect(deviceSerialNumber).toEqual(device.serialNumber)

      const deviceName = await drawerDeviceNames[device.index]
      await expect(deviceName).toHaveText(device.name)
    }

    await browser.execute(() => {
      window.scrollBy(0, 500)
    })

    await browser.pause(1000)

    await sixthDeviceOnDrawer.waitForClickable()
    await sixthDeviceOnDrawer.click()
  })

  it("Verify 6th Kompakt with new Serial Number and click Show connected devices", async () => {
    const serialNumberLabel = await OverviewKompaktPage.serialNumberLabel
    const serialNumberValue = await OverviewKompaktPage.serialNumberValue
    await expect(serialNumberLabel).toHaveText("Serial number")
    await expect(serialNumberValue).toHaveText(
      overviewDataWithOneSimCard6th.summary.about.serialNumber.text.toString()
    )
    const selectConnectedDevices = await overviewPage.selectConnectedDevices
    await selectConnectedDevices.waitForClickable()
    await expect(selectConnectedDevices).toHaveText("6")
    await selectConnectedDevices.click()
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

const devicePaths = ["path-1", "path-2", "path-3", "path-4", "path-5", "path-6"]
devicePaths.forEach((path) => E2EMockClient.removeDevice(path))
