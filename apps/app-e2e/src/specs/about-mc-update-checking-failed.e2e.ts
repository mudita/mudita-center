/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  itBehavesLikeAboutTabBeforeManualCheck,
  itBehavesLikeCheckingModal,
  simulateMcUpdateCheckFromAbout,
} from "../helpers/about-mc-update.helper"
import McUpdatePage from "../page-objects/mc-update.page"
import AboutPage from "../page-objects/about.page"

describe("About MC Update Checking Failed", () => {
  before(async () => {
    await simulateMcUpdateCheckFromAbout({ error: true })
  })

  itBehavesLikeAboutTabBeforeManualCheck()
  itBehavesLikeCheckingModal()

  describe("After Failed Manual Check", () => {
    it("should display the 'Update Error' modal", async () => {
      await expect(McUpdatePage.updateErrorModal).toBeDisplayed()
      await expect(McUpdatePage.updateErrorModalTitle).toBeDisplayed()
      await expect(McUpdatePage.updateErrorModalTitleIcon).toBeDisplayed()
      await expect(McUpdatePage.updateErrorModalDescription).toBeDisplayed()
      await expect(McUpdatePage.updateErrorModalCloseButton).toBeDisplayed()
    })

    // TODO: Unskip this test when the issue with the not updated label is resolved
    it.skip("should show 'Checking for update failed' label in About tab", async () => {
      await McUpdatePage.updateErrorModalCloseButton.click()
      await expect(AboutPage.updateLabel).toBeDisplayed()
      await expect(AboutPage.updateLabel).toHaveText(
        "Checking for update failed"
      )
    })
  })
})
