import { E2EMockClient } from "../../../../../libs/e2e-mock/client/src"
import {
  overviewConfigForBackup,
  overviewDataWithOneSimCard,
} from "../../../../../libs/e2e-mock/responses/src"
import ModalBackupKompaktPage from "../../page-objects/modal-backup-kompakt.page"
import { mockPreBackupResponses } from "../../helpers/mock-prebackup"

describe("E2E mock sample - overview view", () => {
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
    E2EMockClient.mockResponse({
      path: "path-1",
      body: overviewConfigForBackup,
      endpoint: "FEATURE_CONFIGURATION",
      method: "GET",
      status: 200,
    })
    E2EMockClient.mockResponse({
      path: "path-1",
      body: overviewDataWithOneSimCard,
      endpoint: "FEATURE_DATA",
      method: "GET",
      status: 200,
    })
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
    mockPreBackupResponses("path-1", 12345)
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

  it("Verify backup creating modal, check if backup is in progress", async () => {
    const backupInProgressModal =
      await ModalBackupKompaktPage.backupInProgressModal
    await expect(backupInProgressModal).toBeDisplayed()
    await expect(ModalBackupKompaktPage.creatingBackupTitle).toHaveText(
      "Creating backup"
    )
    await expect(ModalBackupKompaktPage.creatingBackupDescription).toHaveText(
      "Please wait and do not unplug your device from computer."
    )
    const creatingBackupProgressBar =
      await ModalBackupKompaktPage.creatingBackupProgressBar

    const creatingBackupProgressBarValue =
      await creatingBackupProgressBar.getAttribute("value")
    expect(creatingBackupProgressBarValue).toBe("10")

    const creatingBackupProgressBarDetails =
      await ModalBackupKompaktPage.creatingBackupProgressBarDetails
    await expect(creatingBackupProgressBarDetails).toHaveText("10%")
  })
})
