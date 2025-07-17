/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Page from "./page"
import Modal from "../helpers/modal"
import { UsbAccessTestIds } from "app-init/models"

class UsbAccessPage extends Page {
  private _requestModal = new Modal("general.usbAccess.requestModal.title")

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
}

export default new UsbAccessPage()
