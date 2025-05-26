import { E2EMockClient } from "../../../../../libs/e2e-mock/client/src"
import { mockFullStorageDevice } from "../../helpers/mock-full-storage.helper"
import {
  overviewConfigForBackup,
  overviewDataWithOneSimCard,
} from "../../../../../libs/e2e-mock/responses/src"
import ModalBackupKompaktPage from "../../page-objects/modal-backup-kompakt.page"
import { mockBackupResponses } from "../../helpers/mock-backup"
import OverviewKompaktPage from "../../page-objects/overview-kompakt.page"

describe("Backup error - full storage", () => {
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

  it("Mock prebackup, mock full storage, wait for Overview Page and click Create Backup", async () => {
    mockBackupResponses("path-1")
    mockFullStorageDevice("path-1")

    const createBackupButton = await ModalBackupKompaktPage.createBackupButton
    await expect(createBackupButton).toBeDisplayed()
    await expect(createBackupButton).toBeClickable()
    await createBackupButton.click()
  })

  it("Click Create backup and click skip password to start backup", async () => {
    const createBackupProceedNext =
      await ModalBackupKompaktPage.createBackupProceedNext
    await expect(createBackupProceedNext).toBeClickable()
    await createBackupProceedNext.click()

    const createBackupPasswordSkip =
      await ModalBackupKompaktPage.createBackupPasswordSkip
    await createBackupPasswordSkip.click()
  })

  it("Close backup failed modal and check if overview page is still displayed", async () => {
    const backupFailureIcon = ModalBackupKompaktPage.backupFailureIcon
    await expect(backupFailureIcon).toBeDisplayed()

    const backupFailedTitle = ModalBackupKompaktPage.backupFailedTitle
    await expect(backupFailedTitle).toHaveText("Backup failed")

    const backupFailedSubTitle = ModalBackupKompaktPage.backupFailedSubTitle
    await expect(backupFailedSubTitle).toHaveText(
      "The backup process was interrupted."
    )

    const backupFailedModalCloseButton =
      ModalBackupKompaktPage.backupFailedModalCloseButton
    await backupFailedModalCloseButton.click()

    //check if kompakt image is displayed to assure you are on Overview page (the failed backup popup is closed)
    const kompaktImage = await OverviewKompaktPage.kompaktImage
    await expect(kompaktImage).toBeDisplayed()
  })
})
