/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Page from "./page"

class HelpModalPage extends Page {
  /**[Selector]  Modal close button  */
  public get closeModalButton() {
    return $("//*[@data-testid='close-modal-button']")
  }

  /**[Selector]  Modal title  */
  public get modalHeader() {
    return $("//*[@data-testid='modal-header']")
  }

  /**[Selector]  Contact support email input  */
  public get emailInput() {
    return $("//*[@data-testid='email-input']")
  }

  /**[Selector]  Contact support message input  */
  public get descriptionInput() {
    return $("//*[@data-testid='description-input']")
  }

  /**[Selector]  Send button */
  public get sendButton() {
    return $("//*[@data-testid='submit-button']")
  }

  /**[Selector] Send button label */
  public get sendButtonLabel() {
    return $("//button[@data-testid='submit-button']//p")
  }

  /** returns an Array containing list of attached files */
  async attachmentsList() {
    return $("//*[@data-testid='file-list']").$$(
      ".//*[@data-testid='file-list-file']"
    )
  }

  /**[Selector]  single attachment element */
  public get singleAttachment() {
    return $("//*[@data-testid='file-list-file']")
  }

  /**[Selector] Success sent message modal */
  public get sentSuccessModal() {
    return $("//*[@data-testid='contact-support-modal-success']")
  }

  /**[Selector] Close bottom button */
  public get closeBottomButton() {
    return $("//*[@data-testid='close-bottom-button']")
  }

  /**[Selector] Invalid email text */
  public get invalidEmailTextElement() {
    return $("//input[@data-testid='email-input']/following-sibling::*[1]")
  }

  /**[Selector] Support icon */
  public get iconSupport() {
    return $("//*[@data-testid='icon-Support']")
  }

  /**[Selector] Attachment icon */
  public get iconAttachment() {
    return $("//*[@data-testid='icon-Attachment']")
  }

  /**[Selector] Modal title with specific text */
  public get modalTitle() {
    return $("//*[@data-testid='contact-support-modal-title']")
  }

  /**[Selector] Modal subtitle */
  public get modalSubtitle() {
    return $("//*[@data-testid='contact-support-modal-subtitle']")
  }

  /**[Selector] Current date zip file */
  public get currentDateZipFile() {
    const currentDate = new Date().toISOString().split("T")[0] // Get current date in YYYY-MM-DD format
    return $(`//p[contains(text(), '${currentDate}.zip')]`)
  }

  /**[Selector] Attached files text */
  public get attachedFilesLabel() {
    return $("//*[@data-testid='attached-files-label']")
  }

  /**[Selector] Attached files subtext */
  public get attachedFilesSubText() {
    return $("//*[@data-testid='attached-files-subtext']")
  }

  /**[Selector] Email label */
  public get emailLabel() {
    return $("//*[@data-testid='email-label']")
  }

  /**[Selector] Message label */
  public get messageLabel() {
    return $("//*[@data-testid='message-label']")
  }

  /**[Selector] Whole modal */
  public get wholeModal() {
    return $("//*[@data-testid='contact-support-modal']")
  }
}

export default new HelpModalPage()
