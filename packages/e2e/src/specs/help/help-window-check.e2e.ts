import NavigationTabs from "../../page-objects/tabs.page"
import HelpPage from "../../page-objects/help.page"

describe.skip("Check new window display in Help", () => {
  before(async () => {
    // Waiting for device connected through USB
    await browser.executeAsync((done) => {
      setTimeout(done, 10000)
    })
  })
  it("Should click help tab, switch to new window and check if help topic is displayed in new window", async () => {
    await browser.executeAsync((done) => {
      setTimeout(done, 10000)
    })
    const helpTab = await NavigationTabs.helpTab
    await helpTab.waitForDisplayed({ timeout: 15000 })
    await helpTab.click()

    await browser.switchWindow("Mudita Center - Help")

    const helpTopic = await HelpPage.helpListElement
    await helpTopic.waitForDisplayed({ timeout: 15000 })
    await expect(helpTopic).toBeDisplayed()
  })
})
