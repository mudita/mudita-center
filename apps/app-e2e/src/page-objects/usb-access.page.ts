/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Page from "./page"
import Modal from "../helpers/modal"
import { UsbAccessTestIds } from "app-init/models"

class UsbAccessPage extends Page {
  private _requestModal = new Modal("general.usbAccess.requestModal.title")
  private _processingModal = new Modal(
    "general.usbAccess.processingModal.title"
  )
  private _grantedModal = new Modal("general.usbAccess.grantedModal.title")

  public get requestModal() {
    return this._requestModal.modal
  }

  public get requestModalTitle() {
    return this._requestModal.title
  }

  public get requestModalTitleIcon() {
    return this._requestModal.titleIcon
  }

  public get requestModalCloseButton() {
    return this._requestModal.closeButton
  }

  public get requestModalDescription() {
    return this.requestModal.$(
      `[data-testid="${UsbAccessTestIds.RequestModalDescription}"]`
    )
  }

  public get requestModalButton() {
    return this.requestModal.$(
      `[data-testid="${UsbAccessTestIds.RequestModalButton}"]`
    )
  }

  public get processingModal() {
    return this._processingModal.modal
  }

  public get processingModalTitle() {
    return this._processingModal.title
  }

  public get processingModalTitleIcon() {
    return this._processingModal.titleIcon
  }

  public get processingModalCloseButton() {
    return this._processingModal.closeButton
  }

  public get grantedModal() {
    return this._grantedModal.modal
  }

  public get grantedModalTitle() {
    return this._grantedModal.title
  }

  public get grantedModalTitleIcon() {
    return this._grantedModal.titleIcon
  }

  public get grantedModalCloseButton() {
    return this._grantedModal.closeButton
  }

  public get grantedModalDescription() {
    return this.grantedModal.$(
      `[data-testid="${UsbAccessTestIds.GrantedModalDescription}"]`
    )
  }

  public get grantedModalButton() {
    return this.grantedModal.$(
      `[data-testid="${UsbAccessTestIds.GrantedModalButton}"]`
    )
  }
}

export default new UsbAccessPage()
