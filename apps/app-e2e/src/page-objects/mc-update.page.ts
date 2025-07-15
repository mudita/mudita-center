/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Page from "./page"
import Modal from "../helpers/modal"
import { AppUpdaterTestIds } from "app-updater/models"

export class McUpdatePage extends Page {
  private _updateAvailableModal: Modal

  constructor(options?: { version: string }) {
    super()
    this._updateAvailableModal = new Modal(
      "general.appUpdate.availableModal.title",
      options
    )
  }

  public get updateAvailableModal() {
    return this._updateAvailableModal.modal
  }

  public get updateAvailableModalTitle() {
    return this._updateAvailableModal.title
  }

  public get updateAvailableModalDescription() {
    return this.updateAvailableModal.$(
      `[data-testid="${AppUpdaterTestIds.UpdateAvailableModalDescription}"]`
    )
  }

  public get updateAvailableModalButton() {
    return this.updateAvailableModal.$(
      `[data-testid="${AppUpdaterTestIds.UpdateAvailableModalButton}"]`
    )
  }

  public get updateAvailableModalPrivacyPolicyLink() {
    return this.updateAvailableModal.$(
      `[data-testid="${AppUpdaterTestIds.UpdateAvailableModalPrivacyPolicyLink}"]`
    )
  }
}
