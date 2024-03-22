/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Page from "./page"

class ModalPage extends Page {
  get modalHeader() {
    return $('[data-testid="modal-title"]')
  }

  get modalContentUpToDate() {
    return $('[data-testid="app-update-not-available"]')
  }
}

export default new ModalPage()
