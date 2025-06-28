/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Page from "./page"

class ModalAppUpdate extends Page {
  get modalHeader() {
    return $("//*[@data-testid='modal-title']")
  }

  public get paragraphAvailableVersion() {
    return $("//h4[contains(text(), 'Update Mudita Center to')]")
  }

  public get paragraphCurrentVersion() {
    return $("//p[contains(text(), 'Update it to use')]")
  }

  public get paragraphPrivacyPolicy() {
    return $(
      "//p[contains(text(), 'Please accept the Privacy Policy to start updating Mudita Center.')]"
    )
  }

  public get linkPrivacyPolicy() {
    return $("//a[text()='Privacy Policy']")
  }

  public get checkboxPrivacyPolicy() {
    return $("//*[@data-testid='privacy-policy-checkbox']")
  }

  public get buttonUpdate() {
    return $("//*[@data-testid='modal-action-button']")
  }

  public get paragraphUpdatingMuditaCenter() {
    return $("//h4[contains(text(), 'Updating Mudita Center')]")
  }

  public get spinnerLoader() {
    return $("//*[@data-testid='loader-spinner']")
  }

  public get paragraphPleaseWait() {
    return $(
      "//p[contains(text(), 'Please wait while Mudita Center is being updated.')]"
    )
  }
}

export default new ModalAppUpdate()
