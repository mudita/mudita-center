/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Page from "./page"
import Modal from "../helpers/modal"
import { AppUpdaterTestIds } from "app-updater/models"
import { ProgressBarTestIds } from "app-theme/models"

class McUpdatePage extends Page {
  private _updateCheckingModal = new Modal(
    "general.appUpdate.checkingModal.title"
  )
  private _updateAvailableModal = new Modal(
    "general.appUpdate.availableModal.title"
  )
  private _updateInProgressModal = new Modal(
    "general.appUpdate.progressModal.title"
  )
  private _updateNotAvailableModal = new Modal(
    "general.appUpdate.notAvailableModal.title"
  )
  private _updateErrorModal = new Modal("general.appUpdate.errorModal.title")

  public get updateCheckingModal() {
    return this._updateCheckingModal.modal
  }

  public get updateCheckingModalTitle() {
    return this._updateCheckingModal.title
  }

  public get updateCheckingModalTitleIcon() {
    return this._updateCheckingModal.titleIcon
  }

  public get updateCheckingModalCloseButton() {
    return this._updateCheckingModal.closeButton
  }

  public get updateCheckingModalDescription() {
    return this.updateCheckingModal.$(
      `[data-testid="${AppUpdaterTestIds.UpdateCheckingModalDescription}"]`
    )
  }

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

  public get updateNotAvailableModal() {
    return this._updateNotAvailableModal.modal
  }

  public get updateNotAvailableModalTitle() {
    return this._updateNotAvailableModal.title
  }

  public get updateNotAvailableModalTitleIcon() {
    return this._updateNotAvailableModal.titleIcon
  }

  public get updateNotAvailableModalCloseButton() {
    return this._updateNotAvailableModal.closeButton
  }

  public get updateNotAvailableModalDescription() {
    return this.updateNotAvailableModal.$(
      `[data-testid="${AppUpdaterTestIds.UpdateNotAvailableModalDescription}"]`
    )
  }

  public get updateErrorModal() {
    return this._updateErrorModal.modal
  }

  public get updateErrorModalTitle() {
    return this._updateErrorModal.title
  }

  public get updateErrorModalTitleIcon() {
    return this._updateErrorModal.titleIcon
  }

  public get updateErrorModalCloseButton() {
    return this._updateErrorModal.closeButton
  }

  public get updateErrorModalDescription() {
    return this.updateErrorModal.$(
      `[data-testid="${AppUpdaterTestIds.UpdateErrorModalDescription}"]`
    )
  }
}

export default new McUpdatePage()
