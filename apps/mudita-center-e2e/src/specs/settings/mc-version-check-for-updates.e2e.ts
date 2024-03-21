import SettingsPage from "../../page-objects/settings.page"
import NavigationTabs from "../../page-objects/tabs.page"
import MCModalPage from "../../page-objects/mc-update-modal.page"
import HomePage from "../../page-objects/home.page"
import { isNotLinux } from "E2E/helpers/tests.helper"

if (isNotLinux()) {
  describe("Checking for Mudita Center updates", () => {
    before(async () => {
      const notNowButton = await HomePage.notNowButton
      await notNowButton.waitForDisplayed()
      await notNowButton.click()
    })

    it("Application is up to date", async () => {
      const newsTab = await NavigationTabs.settingsTab
      await newsTab.waitForDisplayed()
      await newsTab.click()

      const tabAbout = await SettingsPage.aboutTab
      await tabAbout.waitForDisplayed()
      await tabAbout.click()

      const upToDateLabel = await SettingsPage.aboutUpToDateLabel
      await upToDateLabel.executeAsync((done) => {
        setTimeout(done, 5000)
      })
      await expect(upToDateLabel).toBeDisplayed()
      await expect(upToDateLabel).toHaveText("You’re up to date.")
    })

    it("Check for updates", async () => {
      const newsTab = await NavigationTabs.settingsTab
      await newsTab.waitForDisplayed()
      await newsTab.click()

      const tabAbout = await SettingsPage.aboutTab
      await tabAbout.waitForDisplayed()
      await tabAbout.click()

      const checkButton = await SettingsPage.aboutCheckForUpdatesButton
      await checkButton.waitForDisplayed()
      await expect(checkButton).toHaveTextContaining("CHECK FOR UPDATES")
      await checkButton.click()

      const modalHeader = await MCModalPage.modalHeader
      await expect(modalHeader).toBeDisplayed()
      await expect(modalHeader).toHaveText("Mudita Center")

      // // Waiting to check if an update is available
      // await browser.executeAsync((done) => {
      //   setTimeout(done, 10000)
      // })
      // const modalContentUpToDate = await MCModalPage.modalContentUpToDate
      // await expect(modalContentUpToDate).toBeDisplayed()
      // await expect(modalContentUpToDate).toHaveTextContaining("Your Mudita Center is up to date!");
    })
  })
}
