/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Page from "./page"

class SettingsPage extends Page {
  public get locationTextLabel() {
    return $('[data-testid="location"]')
  }

  public get generalTab() {
    return $('a[href="#/settings"] [data-testid="icon-Connection"]')
  }

  public get backupTab() {
    return $('a[href="#/settings/backup"]')
  }

  public get aboutTab() {
    return $('a[href="#/settings/about"]')
  }

  public get generalSendLogsTextLabel() {
    return $("p*=Send Mudita Center logs to Mudita")
  }

  public get backupLocationPathTextLabel() {
    return $('[data-testid="backup-location"]')
  }

  public get aboutInstalledVersionTextLabel() {
    return $("p*=Mudita Center - installed version:")
  }

  get aboutUpToDateLabel() {
    return $("p=You’re up to date.")
  }

  get aboutCheckForUpdatesButton() {
    return $('[data-testid="about-update-button"]')
  }

  public get aboutTermsOfServiceTextLabel() {
    return $("p*=Terms of service")
  }

  public get aboutTermsOfServiceButton() {
    return $('[data-testid="terms-of-service-button"]')
  }

  public get aboutTermsOfServiceComponentWrapper() {
    return $('[data-testid="terms-of-service-component-wrapper"]')
  }

  public get aboutPrivacyPolicyTextLabel() {
    return $("p*=Privacy Policy")
  }

  public get aboutPrivacyPolicyButton() {
    return $('[data-testid="about-privacy-policy-button"]')
  }

  public get aboutPrivacyPolicyComponentWrapper() {
    return $('[data-testid="privacy-policy-component-wrapper"]')
  }

  public get aboutLicenseTextLabel() {
    return $("p*=License")
  }

  public get aboutLicenseButton() {
    return $('[data-testid="about-license-button"]')
  }

  public get aboutLicenseComponentWrapper() {
    return $('[data-testid="License-component-wrapper"]')
  }

  public get closeButton() {
    return $('[data-testid="icon-Close"]')
  }

  public get addToFavouritessCheckbox() {
    return $('[name="favourite"]')
  }

  public get cancelButton() {
    return $("p*=Cancel")
  }

  public get saveButton() {
    return $('[data-testid="save-button"]')
  }

  public get noContactsText() {
    return $('[data-testid="contact-list-no-result]')
  }
}

export default new SettingsPage()
