import { ChainablePromiseElement } from "webdriverio"
import Page from "./page"

class ModalBackupRestorePage extends Page {
  public get failModalIcon(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="icon-Fail"]')
  }

  public get checkCircleIcon(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="icon-CheckCircle"]')
  }

  public get listOfBackups() {
    return $$('[data-testid="restore-available-backup-modal-body-row"]')
  }

  public get restoreButton(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="modal-action-button"]*=Restore')
  }

  public get restorePasswordInput(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[name="secretKey"]')
  }

  public get restoreSubmitButton(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[type="submit"]*=Confirm')
  }
  //BACKUP modal objects
  public get confirmModalButton(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="modal-action-button"]*=Create backup')
  }

  public get backupPasswordFirstInput(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="backup-first-input"]')
  }

  public get backupPasswordSecondInput(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="backup-second-input"]')
  }

  public get backupSubmitButton(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="backup-submit-button"]')
  }
}

export default new ModalBackupRestorePage()
