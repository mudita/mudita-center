/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { E2EMockClient } from "e2e-mock/client"
import McUpdatePage from "../page-objects/mc-update.page"
import AboutPage from "../page-objects/about.page"
import { itBehavesLikeCheckingModal } from "../helpers/about-mc-update.helper"
import { itBehavesLikeAvailableModal } from "../helpers/mc-update.helper"
import AppInitPage from "../page-objects/app-init.page"
import SettingsPage from "../page-objects/settings.page"
import { SPEC_TITLE } from "../consts/spec-title"

describe(
  SPEC_TITLE.ABOUT_MC_SOFT_UPDATE_AVAILABLE_AFTER_APP_INIT_CHECKING_FAILED,
  () => {
    const version = "5.0.0"

    before(async () => {
      if (process.env.MOCK_SERVER_ENABLED === "1") {
        await E2EMockClient.connect()
        E2EMockClient.setAppUpdaterState({ check: { error: true } })
      }

      await AppInitPage.acceptPrivacyPolicy()
      await AppInitPage.closeFullscreenLayout()
      await SettingsPage.settingsMenuItem.click()
      await SettingsPage.aboutTab.click()
      McUpdatePage.setUpdateAvailableModal({ version })
    })

    describe("Soft update check from About tab after App Init check failure", () => {
      before(async () => {
        E2EMockClient.setAppUpdaterState({
          check: { version, forced: false },
        })
      })

      it("should trigger update check and display available update modal", async () => {
        await AboutPage.updateButton.click()
      })

      itBehavesLikeCheckingModal()
      itBehavesLikeAvailableModal({ closeVisible: true })
    })
  }
)
