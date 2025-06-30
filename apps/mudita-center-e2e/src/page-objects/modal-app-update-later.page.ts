/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Page from "./page"

class ModalAppUpdateLater extends Page {
  get modalHeader() {
    return $("//*[@data-testid='modal-title']")
  }

  get modalCloseButton() {
    return $("//*[@data-testid='close-modal-button']")
  }

  get appUpdateFlowContainer() {
    return $("//*[@data-testid='app-update-flow-container']")
  }

  get paragraphAvailableVersion() {
    return $("//h4[contains(text(), 'Update Mudita Center to')]")
  }

  get paragraphUpdateLaterPrivacyPolicy() {
    return $(
      "//p[contains(text(), 'please agree to the Privacy Policy and update Mudita Center.')]"
    )
  }

  get buttonUpdateLater() {
    return $("//*[@data-testid='close-bottom-button']")
  }

  get buttonUpdate() {
    return $("//*[@data-testid='modal-action-button']")
  }
}

export default new ModalAppUpdateLater()
