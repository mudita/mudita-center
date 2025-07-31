/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import McUpdatePage from "../page-objects/mc-update.page"
import {
  itBehavesLikeAboutTabBeforeManualCheck,
  itBehavesLikeCheckingModal,
  itBehavesLikeUpdateErrorModal,
  simulateMcUpdateCheckFromAbout,
} from "../helpers/about-mc-update.helper"
import { itBehavesLikeAvailableModal } from "../helpers/mc-update.helper"
import AboutPage from "../page-objects/about.page"

describe("About MC Update Downloading Failed", () => {
  before(async () => {
    const version = "5.0.0"
    McUpdatePage.setUpdateAvailableModal({ version })
    await simulateMcUpdateCheckFromAbout({
      check: { version: "5.0.0", forced: false },
      download: { error: true },
    })
  })

  itBehavesLikeAboutTabBeforeManualCheck()
  itBehavesLikeCheckingModal()
  itBehavesLikeAvailableModal({ closeVisible: true })

  describe("When clicking Update in Available Modal and download fails", () => {
    it("should update About label and trigger Update Error modal after download fails", async () => {
      await expect(AboutPage.updateLabel).toHaveText(
        "Version 5.0.0 is available"
      )
      await McUpdatePage.updateAvailableModalButton.click()
    })
  })

  itBehavesLikeUpdateErrorModal()
})
