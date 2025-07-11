/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  PredefinedBackupProgressTestIds,
  ProgressBarTestIds,
} from "../../../../libs/e2e-test-ids/src"
import { OverviewPage } from "./overview.page"

class ModalBackupKompaktPage extends OverviewPage {
  public get createBackupButton() {
    return $("//*[@data-testid='primary-button-backupcreate-backup-button']")
  }
  public get createBackupProceedNext() {
    return $("//*[@data-testid='backup-features-modal-create-action']")
  }

  public get contactList() {
    return $$("//*[@data-testid='backup-features-modal-element-active']")[0]
  }
  public get callLog() {
    return $$("//*[@data-testid='backup-features-modal-element-active']")[1]
  }
  public get backupModalTitle() {
    return $("//*[@data-testid='backup-features-modal-title']")
  }
  public get backupModalDescription() {
    return $("//*[@data-testid='backup-features-modal-description']")
  }
  public get backupModalCancel() {
    return $("//*[@data-testid='backup-features-modal-cancel-action']")
  }

  public get backupModalClose() {
    return $("//*[@data-testid='modal-close-button-icon-button']")
  }

  public get createBackupPasswordModalTitle() {
    return $("//*[@data-testid='predefined-backup-password-title']")
  }

  public get createBackupPasswordOptionalText() {
    return $("//*[@data-testid='predefined-backup-password-title']//span")
  }
  public get createBackupPasswordModalDescription() {
    return $("//*[@data-testid='predefined-backup-password-description']")
  }

  public get createBackupPasswordModalDescriptionMore() {
    return $("//*[@data-testid='predefined-backup-password-description']//span")
  }

  public get createBackupPasswordPlaceholder() {
    return $("//*[@data-testid='predefined-backup-password-placeholder']")
  }

  public get createBackupPasswordRepeatPlaceholder() {
    return $(
      "//*[@data-testid='predefined-backup-password-repeat-placeholder']"
    )
  }

  public get createBackupPasswordConfirm() {
    return $("//*[@data-testid='predefined-backup-password-confirm-button']")
  }

  public get createBackupPasswordSkip() {
    return $("//*[@data-testid='predefined-backup-password-skip-button']")
  }

  public get createBackupPasswordClose() {
    return $("//*[@data-testid='modal-close-button-icon-button']")
  }

  public get inputPassword() {
    return $$("//*[@data-testid='interactive-text-input-input']")[0]
  }

  public get repeatInputPassword() {
    return $$("//*[@data-testid='interactive-text-input-input']")[1]
  }

  public get unhidePasswordIcon() {
    return $("//*[@data-testid='icon-password-hide']")
  }

  public get hidePasswordIcon() {
    return $("//*[@data-testid='icon-password-show']")
  }

  public get passwordsDoNotMatch() {
    return $("//*[@data-testid='interactive-text-input-error-text']")
  }

  public get backupInProgressModal() {
    return $("//*[@data-testid='modal-content-backupbackup-create']")
  }

  public get creatingBackupTitle() {
    return $("//*[@data-testid='predefined-backup-progress-title']")
  }

  public get creatingBackupDescription() {
    return $(
      `//*[@data-testid='${PredefinedBackupProgressTestIds.Description}']`
    )
  }

  public get creatingBackupProgressBar() {
    return $(`//*[@data-testid='${ProgressBarTestIds.Progress}']`)
  }

  public get creatingBackupProgressBarDetails() {
    return $(`//*[@data-testid='${ProgressBarTestIds.Details}']`)
  }

  public get backupInProgressModalSuccess() {
    return $("//*[@data-testid='modal-content-backupbackup-create']")
  }

  public get backupSuccessIcon() {
    return $("//*[@data-testid='icon-success']")
  }

  public get backupSuccessTitle() {
    return $("//h1[text()='Backup complete']")
  }

  public get backupSuccessSubTitle() {
    return $(
      "//p[contains(text(), 'successfully secured') and contains(text(), 'backup folder')]"
    )
  }

  public get backupSuccessModalCloseButton() {
    return $("//*[@data-testid='primary-button-undefined']")
  }

  public get backupInProgressModalCancelled() {
    return $("//*[@data-testid='modal-content-backupbackup-create']")
  }

  public get backupCanceledTitle() {
    return $("//h1[text()='Backup canceled']")
  }

  public get backupCanceledSubTitle() {
    return $("//p[text()='No changes were made.']")
  }

  public get backupFailureIcon() {
    return $("//*[@data-testid='icon-failure']")
  }

  public get backupFailedModal() {
    return $("//*[@data-testid='modal-content-backup-error-modal']")
  }

  public get backupFailedTitle() {
    return $("//h1[text()='Backup failed']")
  }

  public get backupFailedSubTitle() {
    return $("//p[text()='The backup process was interrupted.']")
  }

  public get backupDisconnectedSubTitle() {
    return $("//p[text()='The backup process was interrupted.']")
  }

  public get backupFailedModalCloseButton() {
    return $("//*[@data-testid='primary-button-undefined']")
  }
}
export default new ModalBackupKompaktPage()
