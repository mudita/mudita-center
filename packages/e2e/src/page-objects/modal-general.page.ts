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
}

export default new ModalGeneralPage()
