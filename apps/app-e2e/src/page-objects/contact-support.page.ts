/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ContactSupportTestIds } from "contact-support/models"
import { TextInputTestId } from "app-theme/models"
import Modal from "../helpers/modal"
import Page from "./page"

class ContactSupport extends Page {
  private _formModal = new Modal("general.contactSupport.formModal.title")
  private _errorModal = new Modal("general.contactSupport.errorModal.title")
  private _sendingModal = new Modal("general.contactSupport.sendingModal.title")
  private _successModal = new Modal("general.contactSupport.successModal.title")

  public get formModal() {
    return this._formModal.modal
  }

  public get formModalTitle() {
    return this._formModal.title
  }

  public get formModalDescription() {
    return this.formModal.$(
      `[data-testid="${ContactSupportTestIds.FormModalDescription}"]`
    )
  }

  public get formModalTitleIcon() {
    return this._formModal.titleIcon
  }

  public get formModalCloseButton() {
    return this._formModal.closeButton
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
    return this._errorModal.modal
  }

  public get sendingModal() {
    return this._sendingModal.modal
  }

  public get sendingModalTitle() {
    return this._sendingModal.title
  }

  public get sendingModalTitleIcon() {
    return this._sendingModal.titleIcon
  }

  public get sendingModalCloseButton() {
    return this._sendingModal.closeButton
  }

  public get successModal() {
    return this._successModal.modal
  }

  public get successModalTitle() {
    return this._successModal.title
  }

  public get successModalTitleIcon() {
    return this._successModal.titleIcon
  }

  public get successModalCloseButton() {
    return this._successModal.closeButton
  }

  public get successModalDescription() {
    return this.successModal.$(
      `[data-testid="${ContactSupportTestIds.SuccessModalDescription}"]`
    )
  }

  public get successModalButton() {
    return this.successModal.$(
      `[data-testid="${ContactSupportTestIds.SuccessModalButton}"]`
    )
  }
}

export default new ContactSupport()
