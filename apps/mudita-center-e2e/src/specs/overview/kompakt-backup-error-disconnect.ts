import { E2EMockClient } from "../../../../../libs/e2e-mock/client/src"
import {
  overviewConfigForBackup,
  overviewDataWithOneSimCard,
} from "../../../../../libs/e2e-mock/responses/src"
import ModalBackupKompaktPage from "../../page-objects/modal-backup-kompakt.page"
import { mockBackupResponses } from "../../helpers/mock-backup"
import HomePage from "../../page-objects/home.page"

describe("Backup error - disconnect", () => {
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

  it("Click Create backup and click skip password to start backup and disconnect the device", async () => {
    const createBackupProceedNext =
      await ModalBackupKompaktPage.createBackupProceedNext
    await expect(createBackupProceedNext).toBeClickable()
    await createBackupProceedNext.click()

    const createBackupPasswordSkip =
      await ModalBackupKompaktPage.createBackupPasswordSkip
    await createBackupPasswordSkip.click()

    E2EMockClient.removeDevice("path-1") //disconnect the device
  })

  it("Verify Backup failed modal", async () => {
    //check fail modal
    const backupFailedModal = ModalBackupKompaktPage.backupFailedModal
    await expect(backupFailedModal).toBeDisplayed()

    //check failed icon
    const backupFailureIcon = ModalBackupKompaktPage.backupFailureIcon
    await expect(backupFailureIcon).toBeDisplayed()

    //check failed title
    const backupFailedTitle = ModalBackupKompaktPage.backupFailedTitle
    await expect(backupFailedTitle).toHaveText("Backup failed")

    //check failed subtitle
    const backupDisconnectedSubTitle =
      ModalBackupKompaktPage.backupDisconnectedSubTitle
    await expect(backupDisconnectedSubTitle).toHaveText(
      "The backup process was interrupted."
    )
  })

  it("Close backup failed modal and verify if home screen is present", async () => {
    const backupFailedModalCloseButton =
      ModalBackupKompaktPage.backupFailedModalCloseButton
    await backupFailedModalCloseButton.click()

    //check if home page is displayed
    const homeHeader = await HomePage.homeHeader
    await homeHeader.waitForDisplayed()
    await expect(homeHeader).toHaveText("Welcome to Mudita Center")
  })
})
