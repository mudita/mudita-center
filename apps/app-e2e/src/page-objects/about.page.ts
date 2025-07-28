/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Page from "./page"
import { SettingsTestId } from "settings/models"

class AboutPage extends Page {
  public get aboutWrapper() {
    return $(`[data-testid="${SettingsTestId.AboutWrapper}"]`)
  }

  public get installedVersionRow() {
    return this.aboutWrapper.$("div:nth-child(1) > div > p")
  }

  public get updateButton() {
    return $(`[data-testid="${SettingsTestId.AboutUpdateButton}"]`)
  }

  public get updateLabel() {
    return $(`[data-testid="${SettingsTestId.AboutUpdateLabel}"]`)
  }

  public get termsOfServiceButton() {
    return $(`[data-testid="${SettingsTestId.AboutTermsOfServiceButton}"]`)
  }

  public get privacyPolicyButton() {
    return $(`[data-testid="${SettingsTestId.AboutPrivacyPolicyButton}"]`)
  }

  public get licenseButton() {
    return $(`[data-testid="${SettingsTestId.AboutLicenseButton}"]`)
  }
}

export default new AboutPage()
