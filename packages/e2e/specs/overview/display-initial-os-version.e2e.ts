import OverviewPage from "../../page-objects/overview.page"

describe("Overview Page", () => {
  describe("Have initial OS version", () => {
    before(async () => {
      // Waiting for device connected through USB
      await browser.executeAsync((done) => {
        setTimeout(done, 10000)
      })
    })

    it("should have valid OS version", async () => {
      const VERSION_REGEXP = /[0-9].[0-9].[0-9]/
      const HARDCODED_VERSION = process.env.TEST_INITIAL_VERSION

      const currentVersionField = await OverviewPage.currentDeviceVersion
      await currentVersionField.waitForDisplayed()
      const currentVersionRow = await currentVersionField.getText()
      const currentVersion = currentVersionRow.split(" ")[1]

      await expect(VERSION_REGEXP.test(currentVersion)).toBeTruthy()
      await expect(currentVersion).toEqual(HARDCODED_VERSION)
      await expect(currentVersionField).toBeExisting()
    })
  })
})
