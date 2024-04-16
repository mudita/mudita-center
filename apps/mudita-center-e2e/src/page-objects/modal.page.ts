/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */
import { ChainablePromiseElement } from "webdriverio"
/**
 * main page object containing all methods, selectors and functionality
 * that is shared across all page objects
 */
export default class ModalPage {
  public get modalHeader(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="modal-header"]')
  }

  public get modalCloseButton(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return this.modalHeader.$('[data-testid="icon-Close"]')
  }

  async closeModalButtonClick() {
    await this.modalCloseButton.waitForClickable()
    await this.modalCloseButton.click()
  }
}
