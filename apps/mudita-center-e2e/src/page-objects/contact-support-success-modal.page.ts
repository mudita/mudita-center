/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Page from "./page"

class ContactSupportSuccessModalPage extends Page {
  public get closeModalButton() {
    return $('[data-testid="close-modal-button"]')
  }
  public get modalHeader() {
    return $('[data-testid="modal-header"]')
  }
  public get modalHeaderTitle() {
    return $('[data-testid="modal-title"]')
  }
  public get successIcon() {
    return $('[data-testid="icon-success"]')
  }
  public get sentSuccessModal() {
    return $('[data-testid="contact-support-modal-success"]')
  }
  public get closeBottomButton() {
    return $('/html/body/div[12]/div/div/div/div[2]/button')
  }
}

export default new ContactSupportSuccessModalPage()
