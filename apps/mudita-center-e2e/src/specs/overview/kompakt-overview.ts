import { E2EMockClient } from "../../../../../libs/e2e-mock/client/src"
import {
  outboxReloadOverview,
  overviewDataWithoutBadge,
  overviewDataWithOneSimCard,
} from "../../../../../libs/e2e-mock/responses/src"
import screenshotHelper from "../../helpers/screenshot.helper"
import OverviewPage from "../../page-objects/overview.page"
import OverviewKompaktPage from "../../page-objects/overview-kompakt.page"
import NavigationTabs from "../../page-objects/tabs.page"
import HomePage from "../../page-objects/home.page"
import tabsPage from "../../page-objects/tabs.page"
import overviewKompaktPage from "../../page-objects/overview-kompakt.page"

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

  it("Overwrite device response", async () => {
    // const badge = $(`//p[contains(text(), 'Offline')]`)

    // await badge.waitForDisplayed()
    // await expect(badge).toBeDisplayed()

    // // overwrite default response for given device
    // E2EMockClient.mockResponse({
    //   path: "path-1",
    //   body: overviewDataWithOneSimCard,
    //   endpoint: "FEATURE_DATA",
    //   method: "GET",
    //   status: 200,
    // })

    // // overwrite newest response for given device
    // E2EMockClient.mockResponseOnce({
    //   path: "path-1",
    //   body: outboxReloadOverview,
    //   endpoint: "OUTBOX",
    //   method: "GET",
    //   status: 200,
    // })

    // await badge.waitForDisplayed({ reverse: true })
    // screenshotHelper.makeViewScreenshot()
    // await expect(badge).not.toBeDisplayed()
    await browser.pause(10000)
  })

  it("Verify Overview Page", async () => {
    const muditaOSVersion = await OverviewPage.muditaOSVersion
    await expect(muditaOSVersion).toBeDisplayed

    const serialNumberLabel = OverviewKompaktPage.serialNumberLabel
    const serialNumberValue = OverviewKompaktPage.serialNumberValue
    await expect(serialNumberLabel).toHaveText("Serial number")
    // await expect(serialNumberValue).toHaveText(
    //   overviewDataWithOneSimCard.summary.about.serialNumber.toString()
    // )

    const aboutYourDevice = OverviewKompaktPage.aboutYourDevice
    await expect(aboutYourDevice).toBeDisplayed
    await expect(aboutYourDevice).toBeClickable

    const checkSARInformationButton = OverviewPage.checkSARInformationButton
    await expect(checkSARInformationButton).toBeDisplayed

    const createBackupButton = OverviewPage.createBackupButton
    await expect(createBackupButton).toBeDisplayed
    await expect(createBackupButton).toBeClickable

    const backupInfo = OverviewKompaktPage.backupInfo
    await expect(backupInfo).toBeDisplayed
    await expect(backupInfo).toHaveTextContaining(
      "You haven’t backed up your device yet"
    )
    //not full text to be checked due to spacing issue

    const kompaktImageElement = overviewKompaktPage.kompaktImage
    await expect(kompaktImageElement).toBeDisplayed

    const kompaktBatteryLevel = OverviewKompaktPage.kompaktBatteryLevel
    await expect(kompaktBatteryLevel).toBeDisplayed

    const kompaktBatteryLevelValue =
      OverviewKompaktPage.kompaktBatteryLevelValue
    await expect(kompaktBatteryLevelValue).toBeDisplayed

    const kompaktNetworkName = OverviewKompaktPage.kompaktNetworkName
    await expect(kompaktNetworkName).toBeDisplayed

    const kompaktSignalIcon = overviewKompaktPage.kompaktSignalIcon
    await expect(kompaktSignalIcon).toBeDisplayed

    const kompaktSimCard1 = OverviewKompaktPage.kompaktSimCard1
    await expect(kompaktSimCard1).toBeDisplayed
  })

  it("Click between Tabs and check them", async () => {
    const muditaNewsTab = tabsPage.muditaNewsTab
    await muditaNewsTab.waitForClickable()
    await muditaNewsTab.click()

    const overviewKompaktTab = tabsPage.overviewKompaktTab
    await overviewKompaktTab.waitForClickable()
    await overviewKompaktTab.click()
  })

  it("Disconnect the device and check if Welcome screen is present", async () => {
    E2EMockClient.removeDevice("path-1")
    await HomePage.homeHeader.waitForDisplayed()

    await expect
  })
})
