import NavigationTabs from "../../page-objects/tabs.page"
import HelpPage from "../../page-objects/help.page"

describe("Check new window display in Help", () => {
  before(async () => {
    // Waiting for device connected through USB
    await browser.executeAsync((done) => {
      setTimeout(done, 10000)
    })
  })
  it("Clicks help tab, switches to new window and checks if help topic is displayed in new window", async () => {
    const helpTab = await NavigationTabs.helpTab
    await helpTab.waitForDisplayed({ timeout: 15000 })
    await helpTab.click()

    await browser.switchWindow("#/help")

    const helpTopic = await HelpPage.helpListElement
    await helpTopic.waitForDisplayed({ timeout: 15000 })
    await expect(helpTopic).toBeDisplayed()
  })
})
