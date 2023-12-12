/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ChainablePromiseElement } from "webdriverio"
import Page from "./page"

class ModalContacts extends Page {
  public get iconClose(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
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

  public get modalContent(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="delete-modal-content"]')
  }

  public get textOnModal(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="delete-modal-content"]').$("p")
  }

  public get iconDelete(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="icon-DeleteBig"]')
  }

  public get buttonConfirmDelete(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="modal-action-button"]*=Delete')
  }
  async buttonConfirmDeleteClick() {
    await this.buttonConfirmDelete.waitForDisplayed()
    await this.buttonConfirmDelete.click()
  }

  public get buttonCancel(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="close-bottom-button"]')
  }
  async cancelModalButtonClick() {
    await this.buttonCancel.click()
  }

  public get buttonImport(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="modal-action-button"]*=Import')
  }

  public get textSavingCompleted(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $("h4*=Saving completed")
  }

  public get buttonOK(): ChainablePromiseElement<Promise<WebdriverIO.Element>> {
    return $('[data-testid="modal-action-button"]*=OK')
  }
}

export default new ModalContacts()
