/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Page from "./page"

class ContactSupportSuccessModalPage extends Page {
  public get closeModalButton() {
    return $('[data-testid="modal-close-button-icon-button"]')
  }
  public get successIcon() {
    return $('[data-testid="icon-success"]')
  }
  public get modalHeaderTitle() {
    return $('[data-testid="contact-support-modal-success-title"]')
  }
  public get modalHeaderDescription() {
    return $('[data-testid="contact-support-modal-success-description"]')
  }
  public get modalSuccessCloseButton() {
    return $('[data-testid="contact-support-modal-success-close-button"]')
  }
}

export default new ContactSupportSuccessModalPage()
