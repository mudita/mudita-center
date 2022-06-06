import OverviewPage from "../../page-objects/overview.page"
import GitHubHelper from "../../helpers/github.helper"

describe.skip("Overview Page", () => {
  describe("Check for update modal", () => {
    before(async () => {
      // Waiting for device connected through USB
      await browser.executeAsync((done) => {
        setTimeout(done, 10000)
      })
    })

    xit("should have latest OS version available for update", async () => {
      const checkForUpdateButton = await OverviewPage.checkForUpdateButton
      await checkForUpdateButton.waitForDisplayed()
      await expect(checkForUpdateButton).toBeExisting()

      await checkForUpdateButton.click()

      const checkingForUpdateLoader = await OverviewPage.checkingForUpdateLoader
      await checkingForUpdateLoader.waitForDisplayed()
      await expect(checkingForUpdateLoader).toBeExisting()

      const downloadUpdateButton = await OverviewPage.downloadUpdateNowButton
      await downloadUpdateButton.waitForDisplayed({ timeout: 120000 })
      await expect(downloadUpdateButton).toBeExisting()

      const latestReleaseVersion = await GitHubHelper.getLatestReleaseVersion()

      expect($(`MuditaOS v${latestReleaseVersion}`)).toBeExisting()
    })
  })
})
