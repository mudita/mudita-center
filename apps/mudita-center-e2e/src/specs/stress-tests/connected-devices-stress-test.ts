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
import selectDevicePage from "../../page-objects/select-device.page"

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

    const mockResponses = devices.map((device) => {
      E2EMockClient.mockResponses([
        {
          path: device.path,
          body: device.body,
          endpoint: "FEATURE_DATA",
          method: "GET",
          status: 200,
        },
      ])
      return E2EMockClient.addDevice({
        path: device.path,
        serialNumber: device.serialNumber,
      })
    })
    await Promise.all(mockResponses)
    await browser.pause(6000)
  })

  it("Check Select Device Modal and verify Devices 1 and 2", async () => {
    const selectADeviceToContinueTitle =
      await selectDevicePage.selectADeviceToContinueTitle
    await expect(selectADeviceToContinueTitle).toHaveText(
      "Select a device to continue"
    )

    const availableDevices = await selectDevicePage.availableDevices

    for (const device of availableDevices) {
      await expect(device).toBeDisplayed()
    }

    const firstDeviceOnSelectModal =
      await selectDevicePage.getDeviceOnSelectModal(1)
    const secondDeviceOnSelectModal =
      await selectDevicePage.getDeviceOnSelectModal(2)

    await expect(firstDeviceOnSelectModal).toBeDisplayed()
    await expect(secondDeviceOnSelectModal).toBeDisplayed()

    const selectDeviceModalSerialNumbers =
      selectDevicePage.selectDeviceSerialNumber
    const selectDeviceModalNames = selectDevicePage.selectDeviceName

    const firstDeviceSerialNumber =
      await selectDeviceModalSerialNumbers[0].getText()
    await expect(firstDeviceSerialNumber).toEqual(secondSerialNumber)
    const firstDeviceName = await selectDeviceModalNames[0]
    await expect(firstDeviceName).toHaveText("Kompakt")

    const secondDeviceSerialNumber =
      await selectDeviceModalSerialNumbers[1].getText()
    await expect(secondDeviceSerialNumber).toEqual(firstSerialNumber)
    const secondDeviceName = await selectDeviceModalNames[1]
    await expect(secondDeviceName).toHaveText("Kompakt")
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
      E2EMockClient.mockResponses([
        {
          path: device.path,
          body: device.body,
          endpoint: "FEATURE_DATA",
          method: "GET",
          status: 200,
        },
      ])
      E2EMockClient.addDevice({
        path: device.path,
        serialNumber: device.serialNumber,
      })

      await browser.pause(6000)
    }
  })

  it("Verify Devices 3, 4, 5, 6", async () => {
    const thirdDeviceOnSelectModal =
      await selectDevicePage.getDeviceOnSelectModal(1)
    const fourthDeviceOnSelectModal =
      await selectDevicePage.getDeviceOnSelectModal(2)

    await expect(thirdDeviceOnSelectModal).toBeDisplayed()
    await expect(fourthDeviceOnSelectModal).toBeDisplayed()

    const selectDeviceModalSerialNumbers =
      selectDevicePage.selectDeviceSerialNumber
    const selectDeviceModalNames = selectDevicePage.selectDeviceName

    const thirdDeviceSerialNumber =
      await selectDeviceModalSerialNumbers[2].getText()
    await expect(thirdDeviceSerialNumber).toEqual(thirdSerialNumber)
    const thirdDeviceName = await selectDeviceModalNames[2]
    await expect(thirdDeviceName).toHaveText("Kompakt")

    const fourthDeviceSerialNumber =
      await selectDeviceModalSerialNumbers[3].getText()
    await expect(fourthDeviceSerialNumber).toEqual(fourthSerialNumber)
    const fourthDeviceName = await selectDeviceModalNames[3]
    await expect(fourthDeviceName).toHaveText("Kompakt")

    const fifthDeviceOnSelectModal =
      await selectDevicePage.getDeviceOnSelectModal(1)
    const sixthDeviceOnSelectModal =
      await selectDevicePage.getDeviceOnSelectModal(2)

    await expect(fifthDeviceOnSelectModal).toBeDisplayed()
    await expect(sixthDeviceOnSelectModal).toBeDisplayed()

    const fifthDeviceSerialNumber =
      await selectDeviceModalSerialNumbers[4].getText()
    await expect(fifthDeviceSerialNumber).toEqual(fifthSerialNumber)
    const fifthDeviceName = await selectDeviceModalNames[4]
    await expect(fifthDeviceName).toHaveText("Kompakt")

    const sixthDeviceSerialNumber =
      await selectDeviceModalSerialNumbers[5].getText()
    await expect(sixthDeviceSerialNumber).toEqual(sixthSerialNumber)
    const sixthDeviceName = await selectDeviceModalNames[5]
    await expect(sixthDeviceName).toHaveText("Kompakt")
  })

  it("Switch to 6th device", async () => {
    const sixthDeviceOnSelectModal =
      await selectDevicePage.getDeviceOnSelectModal(6)

    await expect(sixthDeviceOnSelectModal).toBeDisplayed()
    await sixthDeviceOnSelectModal.waitForClickable()
    await sixthDeviceOnSelectModal.click()
  })

  it("Verify Overview Page for 6th device", async () => {
    const kompaktImage = await OverviewKompaktPage.kompaktImage
    await expect(kompaktImage).toBeDisplayed()
    await expect(kompaktImage).toHaveAttribute("src", kompaktImageRegex)

    const kompaktOsVersion = await OverviewKompaktPage.kompaktOsVersion
    await expect(kompaktOsVersion).toBeDisplayed()
    await expect(kompaktOsVersion).toHaveText("Mudita OS")

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

  it("Disconnect the devices and check if News page is present", async () => {
    E2EMockClient.removeDevice("path-1")
    E2EMockClient.removeDevice("path-2")
    E2EMockClient.removeDevice("path-3")
    E2EMockClient.removeDevice("path-4")
    E2EMockClient.removeDevice("path-5")
    E2EMockClient.removeDevice("path-6")

    const homeHeader = await HomePage.homeHeader
    await homeHeader.waitForDisplayed()
    await expect(homeHeader).toHaveText("Welcome to Mudita Center")
  })
})
