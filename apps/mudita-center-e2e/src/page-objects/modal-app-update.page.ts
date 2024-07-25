/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Page from "./page"

class ModalAppUpdate extends Page {
  get modalHeader() {
    return $('[data-testid="modal-title"]')
  }

  public get paragraphAvailableVersion() {
    return $("h4*=Update Mudita Center to")
  }

  public get paragraphCurrentVersion() {
    return $("p*=Update it to use")
  }

  public get paragraphPrivacyPolicy() {
    return $(
      "p*=Please accept the Privacy Policy to start updating Mudita Center."
    )
  }

  public get linkPrivacyPolicy() {
    return $("a=Privacy Policy")
  }

  public get checkboxPrivacyPolicy() {
    return $('[data-testid="privacy-policy-checkbox"]')
  }

  public get buttonUpdate() {
    return $('[data-testid="modal-action-button"]')
  }

  public get paragraphUpdatingMuditaCenter() {
    return $("h4*=Updating Mudita Center")
  }

  public get spinnerLoader() {
    return $('[data-testid="loader-spinner"]')
  }

  public get paragraphPleaseWait() {
    return $("p*=Please wait while Mudita Center is being updated.")
  }
}

export default new ModalAppUpdate()
