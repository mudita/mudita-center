/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Page from "./page"

class ModalPage extends Page {
  get modalHeader() {
    return $('[data-testid="modal-title"]')
  }

  get updateNotAvailable() {
    return $('[data-testid="app-update-not-available"]')
  }

  get updateAvailable() {
    return $('[data-testid="app-update-available"]')
  }

  get updateError() {
    return $('[data-testid="app-update-error"]')
  }

  get checkingFailedUpdateSubtitle() {
    return $("h4*=Checking failed")
  }

  get checkingFailedUpdateBody() {
    return $("p*=Oops, something went wrong.")
  }
}

export default new ModalPage()
