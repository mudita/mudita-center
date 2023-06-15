import OverviewPage from "../../page-objects/overview.page"
import GitHubHelper from "../../helpers/github.helper"

import modalGeneralPage from "../../page-objects/modal-general.page"

describe("Overview Page", () => {
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
      await checkingForUpdateLoader.waitForDisplayed({ timeout: 5000 })
      await expect(checkingForUpdateLoader).toBeDisplayed()

      const downloadUpdateButton = await OverviewPage.downloadUpdateNowButton
      await downloadUpdateButton.waitForDisplayed({ timeout: 120000 })
      await expect(downloadUpdateButton).toBeExisting()

      const latestReleaseVersion = await GitHubHelper.getLatestReleaseVersion()

      expect($(`MuditaOS v${latestReleaseVersion}`)).toBeExisting()
    })
  })
  describe("Check for update modal - Up to date", () => {
    before(async () => {
      // Waiting for device connected through USB
      await browser.pause(10000)
    })

    it("should click check for update and should see you are up to date modal", async () => {
      const checkForUpdateButton = await OverviewPage.checkForUpdateButton

      await checkForUpdateButton.waitForDisplayed()
      await expect(checkForUpdateButton).toBeExisting()

      await checkForUpdateButton.click()

      const checkingForUpdateLoader = await OverviewPage.checkingForUpdateLoader
      await checkingForUpdateLoader.waitForDisplayed({ timeout: 5000 })
      await expect(checkingForUpdateLoader).toBeDisplayed()

      const upToDateModal = await modalGeneralPage.updateNotAvailableModal
      await expect(upToDateModal).toBeDisplayed()
    })
    after(async () => {
      // Waiting for device connected through USB
      await modalGeneralPage.clickCloseModalButton()
    })
  })
})
