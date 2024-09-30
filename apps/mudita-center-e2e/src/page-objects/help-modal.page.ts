/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Page from "./page"

class HelpModalPage extends Page {
  /**[Selector]  Modal close button  */
  public get closeModalButton() {
    return $('[data-testid="close-modal-button"]')
  }
  /**[Selector]  Modal title  */
  public get modalHeader() {
    return $('[data-testid="modal-header"]')
  }
  /**[Selector]  Contact support email input  */
  public get emailInput() {
    return $('[data-testid="email-input"]')
  }
  /**[Selector]  Contact support message input  */
  public get descriptionInput() {
    return $('[data-testid="description-input"]')
  }
  /**[Selector]  Send button */
  public get sendButton() {
    return $('[data-testid="submit-button"]')
  }

  public get sendButtonLabel() {
    return $("p*=Send")
  }

  /** returns an Array containing list of attached files */
  async attachmentsList() {
    return $('[data-testid="file-list"]').$$('[data-testid="file-list-file"]')
  }
  /**[Selector]  single attachment element */
  public get singleAttachment() {
    return $('[data-testid="file-list-file"]')
  }
  /**[Selector] Success sent message modal */
  public get sentSuccessModal() {
    return $('[data-testid="contact-support-modal-success"]')
  }
  /**[Selector] Close bottom button */
  public get closeBottomButton() {
    return $('[data-testid="close-bottom-button"]')
  }
  public get invalidEmailTextElement() {
    return $('//input[@data-testid="email-input"]/following-sibling::*[1]')
  }

  public get iconSupport() {
    return $('[data-testid="icon-Support"]')
  }

  public get iconAttachment() {
    return $('[data-testid="icon-Attachment"]')
  }

  public get modalTitle() {
    return $("h1*=Mudita Center Support")
  }

  public get modalSubtitle() {
    return $(
      "p*=Contact Mudita support team and we will do our best to help you resolve your issues."
    )
  }

  public get currentDateZipFile() {
    const currentDate = new Date().toISOString().split("T")[0] // Get current date in YYYY-MM-DD format
    return $(`p*=${currentDate}.zip`)
  }

  public get attachedFilesText() {
    return $("p*=Attached files")
  }

  public get attachedFilesSubText() {
    return $("p*=The attached files will help us resolve your problem")
  }

  public get emailLabel() {
    return $("p*=Email")
  }

  public get messageLabel() {
    return $("p*=Message (optional)")
  }

  public get wholeModal() {
    return $('[data-testid="contact-support-modal"]')
  }
}

export default new HelpModalPage()
