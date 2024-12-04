/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { OverviewPage } from "./overview.page"

class ModalBackupKompaktPage extends OverviewPage {
  public get createBackupButton() {
    return $('[data-testid="primary-button-backupcreate-backup-button"]')
  }
  public get createBackupProceedNext() {
    return $('[data-testid="backup-features-modal-create-action"]')
  }

  public get contactList() {
    return $$('[data-testid="backup-features-modal-element-active"]')[0]
  }
  public get callLog() {
    return $$('[data-testid="backup-features-modal-element-active"]')[1]
  }
  public get backupModalTitle() {
    return $('[data-testid="backup-features-modal-title"]')
  }
  public get backupModalDescription() {
    return $('[data-testid="backup-features-modal-description"]')
  }
  public get backupModalCancel() {
    return $('[data-testid="backup-features-modal-cancel-action"]')
  }

  public get backupModalClose() {
    return $('[data-testid="modal-close-button-icon-button"]')
  }

  public get createBackupPasswordModalTitle() {
    return $('[data-testid="predefined-backup-password-title"]')
  }

  public get createBackupPasswordOptionalText() {
    return $('[data-testid="predefined-backup-password-title"] span')
  }
  public get createBackupPasswordModalDescription() {
    return $('[data-testid="predefined-backup-password-description"]')
  }

  public get createBackupPasswordModalDescriptionMore() {
    return $('[data-testid="predefined-backup-password-description"] span')
  }

  public get createBackupPasswordPlaceholder() {
    return $('[data-testid="predefined-backup-password-placeholder"]')
  }

  public get createBackupPasswordRepeatPlaceholder() {
    return $('[data-testid="predefined-backup-password-repeat-placeholder"]')
  }

  public get createBackupPasswordConfirm() {
    return $('[data-testid="predefined-backup-password-confirm-button"]')
  }

  public get createBackupPasswordSkip() {
    return $('[data-testid="predefined-backup-password-skip-button"]')
  }

  public get createBackupPasswordClose() {
    return $('[data-testid="modal-close-button-icon-button"]')
  }

  public get inputPassword() {
    return $$('[data-testid="interactive-text-input-input"]')[0]
  }

  public get repeatInputPassword() {
    return $$('[data-testid="interactive-text-input-input"]')[1]
  }

  public get unhidePasswordIcon() {
    return $('[data-testid="icon-password-hide"]')
  }

  public get hidePasswordIcon() {
    return $('[data-testid="icon-password-show"]')
  }

  public get passwordsDoNotMatch() {
    return $('[data-testid="interactive-text-input-error-text"]')
  }

  public get backupInProgressModal() {
    return $('//*[@data-testid=""]')
  }

  public get creatingBackupTitle() {
    return $('//*[@data-testid=""]')
  }
}
export default new ModalBackupKompaktPage()
