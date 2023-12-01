import NavigationTabs from "../../page-objects/tabs.page"
import OverviewPage from "../../page-objects/overview.page"

describe("Check new window display in SAR", () => {
  before(async () => {
    // Waiting for device connected through USB
    await browser.executeAsync((done) => {
      setTimeout(done, 10000)
    })
  })
  it("Navigates to About your Pure in Overview clicks SAR information button and checks wrapper component is displayed in new window", async () => {
    const overviewTab = await NavigationTabs.overviewTab
    await overviewTab.waitForDisplayed()
    await overviewTab.click()

    const about = await OverviewPage.aboutYourPureButton
    await about.click()

    const sarLink = await OverviewPage.checkSARInformationButton
    await sarLink.click()

    await browser.switchWindow("#/overview/pure-system/sar")

    const sarWrapper = await OverviewPage.sarWrapper
    await sarWrapper.waitForDisplayed({ timeout: 15000 })
    await expect(sarWrapper).toBeDisplayed()
  })
})
