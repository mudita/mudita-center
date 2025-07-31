/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { E2EMockClient } from "e2e-mock/client"
import McUpdatePage from "../page-objects/mc-update.page"
import AboutPage from "../page-objects/about.page"
import {
  simulateMcUpdateCheckFromAbout,
  itBehavesLikeCheckingModal,
  itBehavesLikeAboutTabBeforeManualCheck,
  itBehavesLikeUpdateErrorModal,
} from "../helpers/about-mc-update.helper"
import { itBehavesLikeAvailableModal } from "../helpers/mc-update.helper"

describe("About MC Soft Update Available After Checking Failed", () => {
  const version = "5.0.0"

  before(async () => {
    McUpdatePage.setUpdateAvailableModal({ version })

    await simulateMcUpdateCheckFromAbout({ check: { error: true } })
  })

  itBehavesLikeAboutTabBeforeManualCheck()
  itBehavesLikeCheckingModal()
  itBehavesLikeUpdateErrorModal()
  describe("When user retries check manually and soft update is found", () => {
    before(async () => {
      E2EMockClient.setAppUpdaterState({
        check: { version, forced: false },
      })
    })

    it("should trigger another update check and display modal", async () => {
      await AboutPage.updateButton.click()
    })

    itBehavesLikeCheckingModal()
    itBehavesLikeAvailableModal({ closeVisible: true })
  })
})
