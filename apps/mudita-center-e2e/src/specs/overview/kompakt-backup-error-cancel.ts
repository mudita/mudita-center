import { E2EMockClient } from "../../../../../libs/e2e-mock/client/src"
import {
  overviewConfigForBackup,
  overviewDataWithOneSimCard,
} from "../../../../../libs/e2e-mock/responses/src"
import ModalBackupKompaktPage from "../../page-objects/modal-backup-kompakt.page"
import { mockBackupResponses } from "../../helpers/mock-backup"
import OverviewKompaktPage from "../../page-objects/overview-kompakt.page"

describe("Backup error - cancel", () => {
  before(async () => {
    E2EMockClient.connect()
    //wait for a connection to be established
    await browser.waitUntil(() => {
      return E2EMockClient.checkConnection()
    })
  })

  after(() => {
    E2EMockClient.stopServer()
    E2EMockClient.disconnect()
  })

  it("Connect device", async () => {
    E2EMockClient.mockResponses([
      {
        path: "path-1",
        body: overviewConfigForBackup,
        endpoint: "FEATURE_CONFIGURATION",
        method: "GET",
        status: 200,
      },
      {
        path: "path-1",
        body: overviewDataWithOneSimCard,
        endpoint: "FEATURE_DATA",
        method: "GET",
        status: 200,
      },
    ])
    E2EMockClient.addDevice({
      path: "path-1",
      serialNumber: "first-serial-number",
    })

    await browser.pause(6000)
    const menuItem = await $(`//a[@href="#/generic/mc-overview"]`)

    await menuItem.waitForDisplayed({ timeout: 10000 })
    await expect(menuItem).toBeDisplayed()
  })

  it("Mock prebackup, wait for Overview Page and click Create Backup", async () => {
    mockBackupResponses("path-1")
    const createBackupButton = await ModalBackupKompaktPage.createBackupButton
    await expect(createBackupButton).toBeDisplayed()
    await expect(createBackupButton).toBeClickable()
    await createBackupButton.click()
  })

  it("Click Create backup and click skip password to start backup and cancel it", async () => {
    const createBackupProceedNext =
      await ModalBackupKompaktPage.createBackupProceedNext
    await expect(createBackupProceedNext).toBeClickable()
    await createBackupProceedNext.click()

    const createBackupPasswordSkip =
      await ModalBackupKompaktPage.createBackupPasswordSkip
    await createBackupPasswordSkip.click()
    await browser.pause(2000) // wait for animation to load from 0% to10%

    const backupModalClose = ModalBackupKompaktPage.backupModalClose
    await expect(backupModalClose).toBeDisplayed()
    await backupModalClose.click() //click "X" button to cancel backup popup
  })

  it("Verify Backup cancelled modal", async () => {
    const backupInProgressModalCancelled =
      ModalBackupKompaktPage.backupInProgressModalCancelled
    await expect(backupInProgressModalCancelled).toBeDisplayed()

    const backupFailureIcon = ModalBackupKompaktPage.backupFailureIcon
    await expect(backupFailureIcon).toBeDisplayed()

    const backupCanceledTitle = ModalBackupKompaktPage.backupCanceledTitle
    await expect(backupCanceledTitle).toHaveText("Backup canceled")

    const backupCanceledSubTitle = ModalBackupKompaktPage.backupCanceledSubTitle
    await expect(backupCanceledSubTitle).toHaveText("No changes were made.")
  })

  it("Close backup cancelled modal and if overview page is still displayed", async () => {
    const backupFailedModalCloseButton =
      ModalBackupKompaktPage.backupFailedModalCloseButton
    await backupFailedModalCloseButton.click()

    //check if kompakt image is displayed to assure you are on Overview page (the cancelled backup popup is closed)
    const kompaktImage = await OverviewKompaktPage.kompaktImage
    await expect(kompaktImage).toBeDisplayed()
  })
})
