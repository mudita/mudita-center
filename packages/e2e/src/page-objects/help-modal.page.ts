/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ChainablePromiseElement } from "webdriverio"
import Page from "./page"

class HelpModalPage extends Page {
  /**[Selector]  Modal close button  */
  public get closeModalButton(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="close-modal-button"]')
  }
  /**[Selector]  Modal title  */
  public get modalHeader(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="modal-header"]')
  }
  /**[Selector]  Contact support email input  */
  public get emailInput(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="email-input"]')
  }
  /**[Selector]  Contact support message input  */
  public get descriptionInput(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="description-input"]')
  }
  /**[Selector]  Send button */
  public get sendButton(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="submit-button"]')
  }

  /** returns an Array containing list of attached files */
  async attachmentsList() {
    return $('[data-testid="file-list"]').$$('[data-testid="file-list-file"]')
  }
  /**[Selector]  single attachment element */
  public get singleAttachment(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="file-list-file"]')
  }
}

export default new HelpModalPage()
