/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import McUpdatePage from "../page-objects/mc-update.page"
import {
  itBehavesLikeCheckingModal,
  simulateMcUpdateCheckFromAbout,
} from "../helpers/about-mc-update.helper"
import {
  itBehavesLikeAvailableModal,
  itBehavesLikeUpdateInProgressModal,
  TriggerSource,
} from "../helpers/mc-update.helper"
import AboutPage from "../page-objects/about.page"

describe("About MC Soft Update Available After Manual Check", () => {
  before(async () => {
    const version = "5.0.0"
    McUpdatePage.setUpdateAvailableModal({ version })
    await simulateMcUpdateCheckFromAbout({ version, forced: false })
  })

  describe("Before Manual Check", () => {
    it("should display 'You're up to date.' label and 'CHECK FOR UPDATES' button", async () => {
      await expect(AboutPage.updateButton).toBeDisplayed()
      await expect(AboutPage.updateButton).toHaveText("CHECK FOR UPDATES")
      await expect(AboutPage.updateLabel).toBeDisplayed()
      await expect(AboutPage.updateLabel).toHaveText("You’re up to date.")
    })

    it("should trigger update check on button click", async () => {
      await AboutPage.updateButton.click()
    })
  })

  itBehavesLikeCheckingModal()
  itBehavesLikeAvailableModal({ closeVisible: true })

  describe("After Closing Available Modal", () => {
    it("should update About label and button to show available version", async () => {
      await McUpdatePage.updateAvailableModalCloseButton.click()
      await expect(AboutPage.updateLabel).toHaveText(
        "Version 5.0.0 is available"
      )
      await expect(AboutPage.updateButton).toHaveText("UPDATE NOW")
    })
  })

  itBehavesLikeUpdateInProgressModal(TriggerSource.AboutTab)
})
