/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Page from "./page"
import { SettingsTestId } from "settings/models"

class SettingsPage extends Page {
  public get settingsMenuItem() {
    return $('a[href="#/settings"]')
  }

  public get activeMenuItem() {
    return $("nav a.active")
  }

  public get appHeader() {
    return $("h1")
  }

  public get backupLocation() {
    return $(`[data-testid="backup-location"]`)
  }

  public get changeBackupLocationButton() {
    return $(`[data-testid="${SettingsTestId.ChangeBackupLocationButton}"]`)
  }

  public get aboutTab() {
    return $(`[data-testid="${SettingsTestId.AboutTab}"]`)
  }

  public get backupTab() {
    return $(`[data-testid="${SettingsTestId.BackupTab}"]`)
  }
}

export default new SettingsPage()
