/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Page from "./page"
import Modal from "../helpers/modal"
import { AppUpdaterTestIds } from "app-updater/models"
import { ProgressBarTestIds } from "app-theme/models"

class McUpdatePage extends Page {
  private _updateAvailableModal = new Modal(
    "general.appUpdate.availableModal.title"
  )
  private _updateInProgressModal = new Modal(
    "general.appUpdate.progressModal.title"
  )

  public setUpdateAvailableModal(options: { version: string }) {
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

  public get updateAvailableModalTitleIcon() {
    return this._updateAvailableModal.titleIcon
  }

  public get updateAvailableModalCloseButton() {
    return this._updateAvailableModal.closeButton
  }

  public get updateAvailableModalDescription() {
    return this.updateAvailableModal.$(
      `[data-testid="${AppUpdaterTestIds.UpdateAvailableModalDescription}"]`
    )
  }

  public get updateAvailableModalCheckbox() {
    return this.updateAvailableModal
      .$(`[data-testid="${AppUpdaterTestIds.UpdateAvailableModalCheckbox}"]`)
      .$("div")
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

  public get updateInProgressModal() {
    return this._updateInProgressModal.modal
  }

  public get updateInProgressModalTitle() {
    return this._updateInProgressModal.title
  }

  public get updateInProgressModalTitleIcon() {
    return this._updateInProgressModal.titleIcon
  }

  public get updateInProgressModalCloseButton() {
    return this._updateInProgressModal.closeButton
  }

  public get updateInProgressModalDescription() {
    return this.updateInProgressModal.$(
      `[data-testid="${AppUpdaterTestIds.UpdateInProgressModalDescription}"]`
    )
  }

  public get updateInProgressModalProgressBarDetails() {
    return this.updateInProgressModal.$(
      `[data-testid="${ProgressBarTestIds.Details}"]`
    )
  }
}

export default new McUpdatePage()
