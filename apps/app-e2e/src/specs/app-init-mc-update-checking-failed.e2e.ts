/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { simulateAppInitUpdateStep } from "../helpers/mc-update.helper"
import McUpdatePage from "../page-objects/mc-update.page"
import SettingsPage from "../page-objects/settings.page"
import AppInitPage from "../page-objects/app-init.page"
import AboutPage from "../page-objects/about.page"

describe("App Init Step - MC Update Checking Failed", () => {
  before(async () => {
    await simulateAppInitUpdateStep({ check: { error: true } })
  })

  it("should keep the Update Not Available Modal hidden on init", async () => {
    await expect(McUpdatePage.updateNotAvailableModal).not.toBeDisplayed()
  })

  it("should keep the Update Error Modal hidden on init", async () => {
    await expect(McUpdatePage.updateErrorModal).not.toBeDisplayed()
  })

  it("should navigate to About tab", async () => {
    await AppInitPage.closeFullscreenLayout()
    await SettingsPage.settingsMenuItem.click()
    await SettingsPage.aboutTab.click()
  })

  // TODO: Unskip this test when the issue with the not updated label is resolved
  it.skip("should show 'Checking for update failed' label in About tab", async () => {
    await expect(AboutPage.updateLabel).toBeDisplayed()
    await expect(AboutPage.updateLabel).toHaveText("Checking for update failed")
  })

  it("should display the Update Error Modal after a manual check from About", async () => {
    await AboutPage.updateButton.click()
    await expect(McUpdatePage.updateErrorModal).toBeDisplayed()
  })
})
