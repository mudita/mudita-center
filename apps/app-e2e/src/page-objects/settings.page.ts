/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Page from "./page"
import { SettingsTestId } from "settings/models"

class SettingsPage extends Page {
  public get settingsMenuItem() {
    return $('a[href="#/settings"]') // lub użyj data-testid, jeśli istnieje
  }

  public get activeMenuItem() {
    return $("nav a.active") // lub dopasuj do struktury aplikacji
  }

  public get appHeader() {
    return $("h1") // dostosuj, jeśli header ma data-testid
  }

  public get backupLocation() {
    return $(`[data-testid="backup-location"]`)
  }

  public get changeBackupLocationButton() {
    return $(`[data-testid="${SettingsTestId.ChangeBackupLocationButton}"]`)
  }

  public get aboutTab() {
    return $('a[href="#/settings/about"]')
  }

  public get backupTab() {
    return $('a[href="#/settings/backup"]')
  }
}

export default new SettingsPage()
