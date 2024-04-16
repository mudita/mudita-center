/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ChainablePromiseElement } from "webdriverio"
import Page from "./page"

class ModalGeneralPage extends Page {
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
  public get modalHeader(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="modal-header"]')
  }

  public get updateAvailableModalCloseButton(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return this.modalHeader.$('[data-testid="icon-Close"]')
  }

  async clickUpdateAvailableModalCloseButton() {
    try {
      await this.updateAvailableModalCloseButton.waitForDisplayed({
        timeout: 6000,
      })
      await this.updateAvailableModalCloseButton.click()
    } catch (error) {
      console.log(error)
    }
  }
  public get closeModalBackgroundUpdateAvailableFailed(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="update-os-flow-check-for-update-failed-modal"]').$(
      '[data-testid="icon-Close"]'
    )
  }

  async clickCloseOnBackgroundUpdateFailedModal() {
    try {
      await this.closeModalBackgroundUpdateAvailableFailed.waitForDisplayed({
        timeout: 6000,
      })
      await this.closeModalBackgroundUpdateAvailableFailed.click()
    } catch (error) {
      console.log(error)
    }
  }

  public get updateNotAvailableModal(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="update-os-flow-update-not-available-modal"]')
  }

  public get closeModalButton(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="close-modal-button"]')
  }

  async clickCloseModalButton() {
    try {
      await this.closeModalButton.waitForDisplayed({
        timeout: 6000,
      })
      await this.closeModalButton.click()
    } catch (error) {
      console.log(error)
    }
  }
}

export default new ModalGeneralPage()
