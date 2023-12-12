import OverviewPage from "../../page-objects/overview.page"
import VersionValidateHelper from "../../helpers/version-validate.helper"
import { initialOsVersion } from "../../../configrc.json"

describe("Overview Page", () => {
  describe("Have initial OS version", () => {
    before(async () => {
      // Waiting for device connected through USB
      await browser.executeAsync((done) => {
        setTimeout(done, 10000)
      })
    })

    xit("should have valid OS version", async () => {
      const HARDCODED_VERSION = initialOsVersion.split("_")[1]

      const currentVersionField = await OverviewPage.currentDeviceVersion
      await currentVersionField.waitForDisplayed()
      const currentVersionRow = await currentVersionField.getText()
      const currentVersion = currentVersionRow.split(" ")[1]

      await expect(
        VersionValidateHelper.isVersionValid(currentVersion)
      ).toBeTruthy()
      await expect(currentVersion).toEqual(HARDCODED_VERSION)
      await expect(currentVersionField).toBeExisting()
    })
  })
})
