/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ContactSupportTestIds } from "contact-support/models"
import { TextInputTestId } from "app-theme/models"
import Modal from "../helpers/modal"
import Page from "./page"

class ContactSupport extends Page {
  private formModalPage = new Modal("general.contactSupport.formModal.title")
  private errorModalPage = new Modal("general.contactSupport.errorModal.title")
  private sendingModalPage = new Modal("general.contactSupport.sendingModal.title")
  private successModalPage = new Modal("general.contactSupport.successModal.title")

  public get formModal() {
    return this.formModalPage.modal
  }

  public get formModalTitle() {
    return this.formModalPage.title
  }

  public get formModalDescription() {
    return this.formModal.$(
      `[data-testid="${ContactSupportTestIds.FormModalDescription}"]`
    )
  }

  public get formModalTitleIcon() {
    return this.formModalPage.titleIcon
  }

  public get formModalCloseButton() {
    return this.formModalPage.closeButton
  }

  public get formModalEmailInputWrapper() {
    return this.formModal.$(
      `[data-testid="${ContactSupportTestIds.FormModalEmailInput}"]`
    )
  }

  public get formModalEmailLabel() {
    return this.formModal.$(
      `[data-testid="${ContactSupportTestIds.FormModalEmailLabel}"]`
    )
  }

  public get formModalEmailInput() {
    return this.formModalEmailInputWrapper.$("input")
  }

  public get formModalEmailInputInvalidText() {
    return this.formModalEmailInputWrapper.$(
      `[data-testid="${TextInputTestId.Error}"]`
    )
  }

  public get formModalDescriptionInputWrapper() {
    return this.formModal.$(
      `[data-testid="${ContactSupportTestIds.FormModalDescriptionInput}"]`
    )
  }

  public get formModalDescriptionLabel() {
    return this.formModal.$(
      `[data-testid="${ContactSupportTestIds.FormModalDescriptionLabel}"]`
    )
  }

  public get formModalDescriptionInput() {
    return this.formModalDescriptionInputWrapper.$("textarea")
  }

  public get formModalSendButton() {
    return this.formModal.$(
      `[data-testid="${ContactSupportTestIds.FormModalSubmitButton}"]`
    )
  }

  public get formModalFileListLabel() {
    return this.formModal.$(
      `[data-testid="${ContactSupportTestIds.FormModalFileListLabel}"]`
    )
  }

  public get formModalFileListDescription() {
    return this.formModal.$(
      `[data-testid="${ContactSupportTestIds.FormModalFileListDescription}"]`
    )
  }

  public get formModalFile() {
    return $(`[data-testid="${ContactSupportTestIds.FormModalFileList}"]`).$$(
      `.//*[@data-testid="${ContactSupportTestIds.FormModalFile}"]`
    )
  }

  public get formModalSingleFile() {
    return $(`[data-testid="${ContactSupportTestIds.FormModalFile}"]`)
  }

  public get errorModal() {
    return this.errorModalPage.modal
  }

  public get sendingModal() {
    return this.sendingModalPage.modal
  }

  public get successModal() {
    return this.successModalPage.modal
  }
}

export default new ContactSupport()
