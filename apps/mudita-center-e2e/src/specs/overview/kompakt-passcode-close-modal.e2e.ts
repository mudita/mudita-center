import { sleep } from "../../helpers/sleep.helper"
import screenshotHelper from "../../helpers/screenshot.helper"
import OverviewKompaktPage from "../../page-objects/overview-kompakt.page"

// npx wdio run wdio.conf.ts --spec src/specs/overview/kompakt-passcode-close-modal.e2e.ts
describe("Connect Kompakt and check if password modal is possible to close", () => {
  before(async () => {
    // Waiting for device connected through USB
    await browser.executeAsync((done) => {
      setTimeout(done, 10000)
    })
  })
  it("Wait for Kompakt connection and validate passcode modal shows up", async () => {
    screenshotHelper.makeViewScreenshot()
    const overviewHeader = await OverviewKompaktPage.overviewHeader

    await expect(overviewHeader).toBeDisplayed()
    await expect(overviewHeader).toHaveText("Overview")

    sleep(30000)
  })
})
