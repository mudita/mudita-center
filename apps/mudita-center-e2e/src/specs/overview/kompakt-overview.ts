import { E2EMockClient } from "../../../../../libs/e2e-mock/client/src"
import { overviewDataWithOneSimCard } from "../../../../../libs/e2e-mock/responses/src"
import OverviewPage from "../../page-objects/overview.page"
import OverviewKompaktPage from "../../page-objects/overview-kompakt.page"
import HomePage from "../../page-objects/home.page"
import tabsPage from "../../page-objects/tabs.page"
import { kompaktImageRegex } from "../../consts/regex-const"

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
    E2EMockClient.mockResponse({
      path: "path-1",
      body: overviewDataWithOneSimCard,
      endpoint: "FEATURE_DATA",
      method: "GET",
      status: 200,
    })
    E2EMockClient.addDevice({
      path: "path-1",
      serialNumber: "first-serial-number",
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

    const kompaktOsVersionLabel =
      await OverviewKompaktPage.kompaktOsVersionLabel
    await expect(kompaktOsVersionLabel).toBeDisplayed

    const serialNumberLabel = await OverviewKompaktPage.serialNumberLabel
    const serialNumberValue = await OverviewKompaktPage.serialNumberValue
    await expect(serialNumberLabel).toHaveText("Serial number")
    await expect(serialNumberValue).toHaveText(
      overviewDataWithOneSimCard.summary.about.serialNumber.text.toString()
    )

    const aboutYourDevice = await OverviewKompaktPage.aboutYourDevice
    await expect(aboutYourDevice).toBeDisplayed
    console.log(aboutYourDevice)
    await expect(aboutYourDevice).toBeClickable
    await aboutYourDevice.click()

    const sarInformationButtonKompakt =
      await OverviewKompaktPage.sarInformationButtonKompakt
    const sarInformationPopup = await OverviewKompaktPage.sarInformationPopup
    await expect(sarInformationButtonKompakt).toBeDisplayed
    await sarInformationButtonKompakt.click()
    await expect(sarInformationPopup).toBeDisplayed

    const sarInformationPopupCloseButton =
      await OverviewKompaktPage.sarInformationPopupCloseButton
    await sarInformationPopupCloseButton.click()

    const createBackupButton = await OverviewPage.createBackupButton
    await expect(createBackupButton).toBeDisplayed
    await expect(createBackupButton).toBeClickable

    const backupInfo = await OverviewKompaktPage.backupInfo
    await expect(backupInfo).toBeDisplayed
    const str: string =
      "\tYou haven’t backed up your device yet.\n Create a backup file to protect against data loss.\n"
    const backupInfoText: string = str.trim()

    const kompaktBatteryIcon = await OverviewKompaktPage.kompaktBatteryIcon
    await expect(kompaktBatteryIcon).toBeDisplayed

    const kompaktBatteryLevelValueSubtext =
      await OverviewKompaktPage.kompaktBatteryLevelValueSubtext
    await expect(kompaktBatteryLevelValueSubtext).toBeDisplayed
    const batteryValNum: string = "100%"
    const batteryValue: string = batteryValNum

    const kompaktNetworkName = await OverviewKompaktPage.kompaktNetworkName
    await expect(kompaktNetworkName).toBeDisplayed
    const strNetwork: string = "T-Mobile"
    const networkName: string = strNetwork

    const kompaktSignalIcon = await OverviewKompaktPage.kompaktSignalIcon
    await expect(kompaktSignalIcon).toBeDisplayed
    const strSignal: string = "network-signal-2"
    const signalValue: string = strSignal

    const kompaktSimCard1Subtext =
      await OverviewKompaktPage.kompaktSimCard1Subtext
    await expect(kompaktSimCard1Subtext).toBeDisplayed
    const sim1: string = "SIM 1"
    const simInfo: string = sim1
  })

  it("Click between Tabs and check them", async () => {
    const muditaNewsTab = await tabsPage.muditaNewsTab
    await muditaNewsTab.waitForClickable()
    await muditaNewsTab.click()

    const overviewKompaktTab = await tabsPage.overviewKompaktTab
    await overviewKompaktTab.waitForClickable()
    await overviewKompaktTab.click()
  })

  it("Disconnect the device and check if Welcome screen is present", async () => {
    E2EMockClient.removeDevice("path-1")
    await HomePage.homeHeader.waitForDisplayed()
  })
})
