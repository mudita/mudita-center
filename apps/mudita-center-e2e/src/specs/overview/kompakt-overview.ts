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
    const muditaOSVersion = await $('[data-testid="os-version"]')
    await expect(muditaOSVersion).toBeDisplayed

    const overviewSerialNumber = await $('[data-testid="device-serial-number"]')
    await expect(overviewSerialNumber).toBeDisplayed

    const aboutYourDevice = await $("p*=About your device")
    await expect(aboutYourDevice).toBeDisplayed
    //await expect(aboutYourDev).toHaveText("About your device")

    const checkSARInformationButton = await $("p*=Check SAR information")
    await expect(checkSARInformationButton).toBeDisplayed
    //await expect(checkSARInformationButton).toHaveText("Check SAR information")

    const createBackupButton = await $("p*=Create backup")
    await expect(createBackupButton).toBeDisplayed

    const kompaktImageElement = await $(
      "#app > div.sc-hrCmsx.iRrrLX > div.sc-gtWJRm.fLIlvh > div.box-sizing-wrapper > div > div > div.sc-eGXPLf.bfaTWN > div > div.sc-eGXPLf.eAMdLd > img"
    )
    await expect(kompaktImageElement).toBeDisplayed

    const batteryLevel = await $('[data-testid="battery-level"]')
    await expect(batteryLevel).toBeDisplayed
    //await expect(batteryLevel).toHaveTextContaining("100%")

    const networkName = await $('[data-testid="network-name"]')
    await expect(networkName).toBeDisplayed
    //await expect(networkName).toHaveTextContaining("T-Mobile")

    const backupInfo = await $(
      "#app > div.sc-hrCmsx.iRrrLX > div.sc-gtWJRm.fLIlvh > div.box-sizing-wrapper > div > div > div.sc-eGXPLf.crpuMj > div > div > div > p"
    )
    await expect(backupInfo).toBeDisplayed
    // //await expect(backupInfo).toHaveText(
    //   "You haven’t backed up your device yet. Create a backup file to protect against data loss."
    // )
  })

  it("Click between Tabs and check them", async () => {
    const muditaNewsTab = $('[data-testid="icon-MenuNews"]')
    await muditaNewsTab.waitForClickable()
    await muditaNewsTab.click()

    const overviewKompaktTab = $('[data-testid="icon-MenuOverview"]')
    await overviewKompaktTab.waitForClickable()
    await overviewKompaktTab.click()
  })

  xit("Disconnect the device and check if Welcome screen is present", async () => {
    //aaa
  })
})
