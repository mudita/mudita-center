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
    await expect(kompaktImage).toBeDisplayed()
    console.log(kompaktImage)
    await expect(kompaktImage).toHaveAttribute("src", kompaktImageRegex)

    const kompaktOsVersion = await OverviewKompaktPage.kompaktOsVersion
    await expect(kompaktOsVersion).toBeDisplayed()

    const kompaktOsVersionLabel =
      await OverviewKompaktPage.kompaktOsVersionLabel
    await expect(kompaktOsVersionLabel).toBeDisplayed()

    const serialNumberLabel = await OverviewKompaktPage.serialNumberLabel
    const serialNumberValue = await OverviewKompaktPage.serialNumberValue
    await expect(serialNumberLabel).toHaveText("Serial number")
    await expect(serialNumberValue).toHaveText(
      overviewDataWithOneSimCard.summary.about.serialNumber.text.toString()
    )

    const aboutYourDevice = await OverviewKompaktPage.aboutYourDevice
    await expect(aboutYourDevice).toBeDisplayed()
    console.log(aboutYourDevice)
    await expect(aboutYourDevice).toBeClickable
    await aboutYourDevice.click()

    const sarInformationButtonKompakt =
      await OverviewKompaktPage.sarInformationButtonKompakt
    const sarInformationPopup = await OverviewKompaktPage.sarInformationPopup
    await expect(sarInformationButtonKompakt).toBeDisplayed()
    await sarInformationButtonKompakt.click()
    await expect(sarInformationPopup).toBeDisplayed()

    const sarInformationPopupCloseButton =
      await OverviewKompaktPage.sarInformationPopupCloseButton
    await sarInformationPopupCloseButton.waitForClickable()
    await sarInformationPopupCloseButton.click()

    const backArrowButton = OverviewKompaktPage.backArrowButton
    await backArrowButton.waitForClickable()
    await backArrowButton.click()

    const createBackupButton = await OverviewPage.createBackupButton
    await expect(createBackupButton).toBeDisplayed()
    await expect(createBackupButton).toBeClickable()

    const backupInfo = await OverviewKompaktPage.backupInfo
    await expect(backupInfo).toBeDisplayed()
    await expect(backupInfo).toHaveTextContaining(
      "You haven’t backed up your device yet.\nCreate a backup file to protect against data loss."
    )

    const kompaktBatteryIcon = await OverviewKompaktPage.kompaktBatteryIcon
    await expect(kompaktBatteryIcon).toBeDisplayed()

    const kompaktBatteryLevelValue =
      await OverviewKompaktPage.kompaktBatteryLevelValue
    await expect(kompaktBatteryLevelValue).toBeDisplayed()
    await expect(kompaktBatteryLevelValue).toHaveText("100%")

    const kompaktNetworkName = await OverviewKompaktPage.kompaktNetworkName
    await expect(kompaktNetworkName).toBeDisplayed()
    await expect(kompaktNetworkName).toHaveText("T-Mobile")

    const kompaktSignalIcon = await OverviewKompaktPage.kompaktSignalIcon
    await expect(kompaktSignalIcon).toBeDisplayed()
    await expect(kompaktSignalIcon).toHaveAttributeContaining(
      "data-testid",
      "icon-network-signal-2"
    )

    const kompaktSimCard1Subtext =
      await OverviewKompaktPage.kompaktSimCard1Subtext
    await expect(kompaktSimCard1Subtext).toBeDisplayed()
    await expect(kompaktSimCard1Subtext).toHaveText("SIM 1")
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
