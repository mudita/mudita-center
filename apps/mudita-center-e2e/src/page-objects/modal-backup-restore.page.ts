/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Page from "./page"

class ModalBackupRestorePage extends Page {
  public get failModalIcon() {
    return $('[data-testid="icon-Fail"]')
  }

  public get checkCircleIcon() {
    return $('[data-testid="icon-CheckCircle"]')
  }

  public get listOfBackups() {
    return $$('[data-testid="restore-available-backup-modal-body-row"]')
  }

  public get restoreButton() {
    return $('[data-testid="modal-action-button"]*=Restore')
  }

  public get restorePasswordInput() {
    return $('[name="secretKey"]')
  }

  public get restoreSubmitButton() {
    return $('[type="submit"]*=Confirm')
  }
  //BACKUP modal objects
  public get createBackupModalButton() {
    return $('[data-testid="modal-action-button"]')
  }

  public get backupPasswordFirstInput() {
    return $('[data-testid="backup-first-input"]')
  }

  public get backupPasswordSecondInput() {
    return $('[data-testid="backup-second-input"]')
  }

  public get backupSubmitButton() {
    return $('[data-testid="backup-submit-button"]')
  }
}

export default new ModalBackupRestorePage()
