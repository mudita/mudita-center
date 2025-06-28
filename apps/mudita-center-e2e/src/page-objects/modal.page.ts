/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

/**
 * main page object containing all methods, selectors and functionality
 * that is shared across all page objects
 */

export default class ModalPage {
  public static get modalHeader() {
    return $("//*[@data-testid='modal-header']")
  }

  public static get modalCloseButton() {
    return this.modalHeader.$(".//*[@data-testid='icon-Close']")
  }

  public static get modalOverlay() {
    return $("//div[contains(@class, 'ReactModal__Overlay')]")
  }

  static async closeModalButtonClick() {
    await ModalPage.modalCloseButton.waitForClickable()
    await ModalPage.modalCloseButton.click()
  }
}
