/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Page from "./page"

class ModalMessages extends Page {
  public get iconClose() {
    return $('[data-testid="icon-Close"]')
  }
  async buttonCloseClick() {
    try {
      this.iconClose.waitForDisplayed({ timeout: 6000 })
      await this.iconClose.click()
    } catch (error) {
      console.log(error)
    }
  }

  public get confirmDeleteButton() {
    return $('[data-testid="modal-action-button"]*=Delete')
  }
  async clickConfirmDeleteButton() {
    await this.confirmDeleteButton.waitForDisplayed()
    await this.confirmDeleteButton.click()
  }
}

export default new ModalMessages()
