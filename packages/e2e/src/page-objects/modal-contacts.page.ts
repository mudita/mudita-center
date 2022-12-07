/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ChainablePromiseElement } from "webdriverio"
import Page from "./page"

class ModalContacts extends Page {
  public get closeIcon(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="icon-Close"]')
  }
  async closeModalButtonClick() {
    try {
      this.closeIcon.waitForDisplayed({ timeout: 6000 })
      await this.closeIcon.click()
    } catch (error) {
      console.log(error)
    }
  }
  public get confrimModalButton(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="modal-action-button"]*=Delete')
  }
  async confirmModalButtonClick() {
    await this.confrimModalButton.waitForDisplayed()
    await this.confrimModalButton.click()
  }

  public get cancelModalButton(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="close-bottom-button"]')
  }
  async cancelModalButtonClick() {
    await this.cancelModalButton.click()
  }
}

export default new ModalContacts()
