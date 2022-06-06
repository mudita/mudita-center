import NavigationTabs from "../../page-objects/tabs.page"
import OverviewPage from "../../page-objects/overview.page"

describe("Overview screen check", () => {
  it("Click on Overview tab and check 'Overview' text label is displayed", async () => {
    const overviewTab = await NavigationTabs.overviewTab
    await overviewTab.waitForDisplayed()
    await overviewTab.click()
    await browser.executeAsync((done) => {
      setTimeout(done, 2000)
    })
    const locationTextLabel = await OverviewPage.locationTextLabel
    const locationTextLabelText = await locationTextLabel.getText()
    await expect(locationTextLabelText).toEqual("Overview")
  })

  it("Click on 'About Your Pure' button and check 'CHECK SAR INFORMATION' link is displayed", async () => {
    const about = await OverviewPage.aboutYourPureButton
    await about.click()

    const sarLink = await OverviewPage.checkSARInfoLink
    await expect(sarLink).toBeDisplayed()
  })
})
