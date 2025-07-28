/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { simulateAppInitUpdateStep } from "../helpers/mc-update.helper"
import McUpdatePage from "../page-objects/mc-update.page"
import SettingsPage from "../page-objects/settings.page"
import AppInitPage from "../page-objects/app-init.page"
import AboutPage from "../page-objects/about.page"
import { SPEC_TITLE } from "../consts/spec-title"

describe(SPEC_TITLE.APP_INIT_UPDATE_CHECKING_FAILED, () => {
  before(async () => {
    await simulateAppInitUpdateStep({ error: true })
  })

  it("should keep the Update Not Available Modal hidden on init", async () => {
    await expect(McUpdatePage.updateNotAvailableModal).not.toBeDisplayed()
  })

  it("should keep the Update Error Modal hidden on init", async () => {
    await expect(McUpdatePage.updateErrorModal).not.toBeDisplayed()
  })

  it("should display the Update Error Modal after a manual check from About", async () => {
    await AppInitPage.closeFullscreenLayout()

    await SettingsPage.settingsMenuItem.click()
    await SettingsPage.aboutTab.click()
    await AboutPage.updateButton.click()

    await expect(McUpdatePage.updateErrorModal).toBeDisplayed()
  })
})
