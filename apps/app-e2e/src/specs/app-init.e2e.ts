/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import AppInitPage from "../page-objects/app-init.page"
import { ModalTestId } from "../all-test-ids"

describe("Privacy Policy modal", () => {
  it("is visible after app start", async () => {
    const modal = await AppInitPage.privacyPolicyModal
    await modal.waitForExist()
    await expect(modal).toBeDisplayed()
  })

  it("has correct title", async () => {
    const title = await AppInitPage.privacyPolicyModal.$(
      `//h1[@data-testid="${ModalTestId.Title}"]`
    )
    await expect(title).toHaveText("Privacy Policy")
  })

  it("has cancel button", async () => {
    const cancelButton = await AppInitPage.privacyPolicyCancelButton
    await expect(cancelButton).toBeClickable()
  })

  it("has correct content", async () => {
    const content = await AppInitPage.privacyPolicyModal.$("p")
    await expect(content).toHaveText(
      "Please read and agree to the Privacy policy to be able to use Mudita Center."
    )
  })

  it("has privacy policy link", async () => {
    const privacyPolicyButton = await AppInitPage.privacyPolicyButton
    await expect(privacyPolicyButton).toHaveText("READ THE PRIVACY POLICY")
    await expect(privacyPolicyButton).toBeClickable()
  })

  it("has agree button", async () => {
    const agreeButton = await AppInitPage.privacyPolicyAcceptButton
    await expect(agreeButton).toHaveText("AGREE")
    await expect(agreeButton).toBeClickable()
  })

  it("closes the modal when agree button is clicked", async () => {
    const agreeButton = await AppInitPage.privacyPolicyAcceptButton
    await agreeButton.click()

    const modal = await AppInitPage.privacyPolicyModal
    await expect(modal).not.toBeDisplayed()
    await AppInitPage.reloadApp()
  })

  it("closes the app when close button is clicked", async () => {
    const closeButton = await AppInitPage.privacyPolicyCancelButton

    try {
      await closeButton.click()
    } catch (e: Error | unknown) {
      // Possible error expected on linux during e2e testing
      if (!(e instanceof Error) || !/invalid session id/i.test(e.message)) {
        throw e
      }
    }

    await AppInitPage.ensureAppIsClosed()
    await AppInitPage.reloadApp()
  })
})
