import OverviewPage from "../../page-objects/overview.page"
import GitHubHelper from "../../helpers/github.helper"

describe.skip("Overview Page", () => {
  describe("Device update process", () => {
    before(async () => {
      // Waiting for device connected through USB
      await browser.executeAsync((done) => {
        setTimeout(done, 10000)
      })
    })

    xit("should check for available updates", async () => {
      const checkForUpdateButton = await OverviewPage.checkForUpdateButton
      await checkForUpdateButton.waitForDisplayed()

      await checkForUpdateButton.click()

      const downloadUpdateButton = await OverviewPage.downloadUpdateNowButton
      await downloadUpdateButton.waitForDisplayed({ timeout: 120000 })

      await downloadUpdateButton.click()

      const updateNowButton = await OverviewPage.updateNowButton
      await updateNowButton.waitForDisplayed({ timeout: 120000 })
      await expect(updateNowButton).toBeExisting()

      await updateNowButton.click()

      const updateLoader = await OverviewPage.updateStatusLoader
      await updateLoader.waitForDisplayed({ timeout: 120000 })
      await expect(updateLoader).toBeExisting()

      const updateCompleted = await OverviewPage.updateCompletedStatus
      await updateCompleted.waitForDisplayed({ timeout: 600000 })
      await expect(updateCompleted).toBeExisting()

      const currentVersionField = await OverviewPage.currentDeviceVersion
      await currentVersionField.waitForDisplayed()
      const currentVersionRow = await currentVersionField.getText()
      const currentVersion = currentVersionRow.split(" ")[1]
      const latestReleaseVersion = await GitHubHelper.getLatestReleaseVersion()

      await expect(currentVersion).toEqual(latestReleaseVersion)
    })
  })
})
