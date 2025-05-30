/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import SettingsPage from "../page-objects/settings.page"
import { SettingsTestId } from "settings/models"

describe("Backup settings screen", () => {
  before(async () => {
    // Przejdź do zakładki Settings
    const settingsMenuItem = await SettingsPage.settingsMenuItem
    await settingsMenuItem.click()
  })

  it("should display 'Backup' tab item as active", async () => {
    const activeMenuItem = await SettingsPage.activeMenuItem
    await expect(activeMenuItem).toHaveText("Backup")
    await expect(activeMenuItem).toHaveAttribute("href", "#/settings/backup")
  })

  it("should display the correct header", async () => {
    const settingsHeader = await SettingsPage.appHeader
    await expect(settingsHeader).toHaveText("Settings")
  })

  it.skip("should show backup location in the settings", async () => {
    const backupLocation = await SettingsPage.backupLocation
    await expect(backupLocation).toBeDisplayed()
    await expect(await backupLocation.getText()).toMatch(/\//)
  })

  it("should show and enable 'Change' button", async () => {
    const changeButton = await SettingsPage.changeBackupLocationButton
    await expect(changeButton).toBeDisplayed()
    await expect(changeButton).toBeClickable()
    await expect(changeButton).toHaveText("CHANGE LOCATION")
  })
})
