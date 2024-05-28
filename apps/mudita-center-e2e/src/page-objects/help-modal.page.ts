/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ChainablePromiseElement } from "webdriverio"
import Page from "./page"

class HelpModalPage extends Page {
  public get closeModalButton() {
    return $('[data-testid="close-modal-button"]')
  }
  public get modalHeader() {
    return $('[data-testid="modal-header"]')
  }
  public get modalHeaderTitle() {
    return $('[data-testid="modal-title"]')
  }

  public get emailInput() {
    return $('[data-testid="email-input"]')
  }

  public get descriptionInput() {
    return $('[data-testid="description-input"]')
  }
  public get sendButton() {
    return $('[data-testid="submit-button"]')
  }
  async attachmentsList() {
    return $('[data-testid="file-list"]').$$('[data-testid="file-list-file"]')
  }
  public get singleAttachment() {
    return $('[data-testid="file-list-file"]')
  }
  public get sentSuccessModal() {
    return $('[data-testid="contact-support-modal-success"]')
  }
  public get closeBottomButton() {
    return $('[data-testid="close-bottom-button"]')
  }
  public get invalidEmailTextElement() {
    return $('//input[@data-testid="email-input"]/following-sibling::*[1]')
  }
}

export default new HelpModalPage()
