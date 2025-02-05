import { E2EMockClient } from "../../../../../libs/e2e-mock/client/src"
import {
  overviewConfigForBackup,
  overviewDataWithOneSimCard,
} from "../../../../../libs/e2e-mock/responses/src"
import ModalBackupKompaktPage from "../../page-objects/modal-backup-kompakt.page"

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

  it("Wait for Overview Page and click Create Backup", async () => {
    const createBackupButton = await ModalBackupKompaktPage.createBackupButton
    await expect(createBackupButton).toBeDisplayed()
    await expect(createBackupButton).toBeClickable()
    await createBackupButton.click()
  })

  it("Verify modal in scope of available backup options, verify text and buttons", async () => {
    const contactList = await ModalBackupKompaktPage.contactList
    await expect(contactList).toBeDisplayed()
    const contactListText = await contactList?.getProperty("textContent")
    expect(contactListText).toContain("Contact list")
    expect(contactListText).not.toContain("Coming soon!")

    const callLog = await ModalBackupKompaktPage.callLog
    await expect(callLog).toBeDisplayed()
    const callLogText = await callLog?.getProperty("textContent")
    expect(callLogText).toContain("Call log")
    expect(callLogText).not.toContain("Coming soon!")

    const backupModalTitle = ModalBackupKompaktPage.backupModalTitle
    await expect(backupModalTitle).toBeDisplayed()
    await expect(backupModalTitle).toHaveText("Create backup")

    const backupModalDescription = ModalBackupKompaktPage.backupModalDescription
    await expect(backupModalDescription).toBeDisplayed()
    await expect(backupModalDescription).toHaveText(
      "All backup data stays on your computer."
    )

    const backupModalCancel = ModalBackupKompaktPage.backupModalCancel
    await expect(backupModalCancel).toBeClickable()

    const backupModalClose = ModalBackupKompaktPage.backupModalClose
    await expect(backupModalClose).toBeClickable()
  })

  it("Click Create backup - verify modal about create password for backup", async () => {
    const createBackupProceedNext =
      await ModalBackupKompaktPage.createBackupProceedNext
    await expect(createBackupProceedNext).toBeClickable()
    await createBackupProceedNext.click()

    const createBackupPasswordModalTitle =
      ModalBackupKompaktPage.createBackupPasswordModalTitle
    await expect(createBackupPasswordModalTitle).toHaveTextContaining(
      "Create password for backup"
    )

    const createBackupPasswordOptionalText =
      ModalBackupKompaktPage.createBackupPasswordOptionalText
    await expect(createBackupPasswordOptionalText).toHaveText("(optional)")

    const createBackupPasswordModalDescription =
      ModalBackupKompaktPage.createBackupPasswordModalDescription
    await expect(createBackupPasswordModalDescription).toHaveTextContaining(
      "You can protect backup with a new password."
    )

    const createBackupPasswordModalDescriptionMore =
      ModalBackupKompaktPage.createBackupPasswordModalDescriptionMore
    await expect(createBackupPasswordModalDescriptionMore).toHaveText(
      "* You can't change/recover the password later."
    )

    const createBackupPasswordPlaceholder =
      ModalBackupKompaktPage.createBackupPasswordPlaceholder
    await expect(createBackupPasswordPlaceholder).toBeClickable()

    const createBackupPasswordRepeatPlaceholder =
      ModalBackupKompaktPage.createBackupPasswordRepeatPlaceholder
    await expect(createBackupPasswordRepeatPlaceholder).toBeClickable()

    const createBackupPasswordConfirm =
      ModalBackupKompaktPage.createBackupPasswordConfirm
    await expect(createBackupPasswordConfirm).not.toBeClickable()

    const createBackupPasswordSkip =
      ModalBackupKompaktPage.createBackupPasswordSkip
    await expect(createBackupPasswordSkip).toBeClickable()

    const createBackupPasswordClose =
      ModalBackupKompaktPage.createBackupPasswordClose
    await expect(createBackupPasswordClose).toBeClickable()
  })

  it("Fill password for a backup, unhide it and verify value and design", async () => {
    const inputPassword = ModalBackupKompaktPage.inputPassword
    await inputPassword.click()
    const randomPassword = Math.random().toString(36).substring(2, 10)
    await inputPassword.setValue(randomPassword)

    const checkPassword = await inputPassword.getAttribute("type")
    await expect(checkPassword).toBe("password")

    const unhidePasswordIcon = ModalBackupKompaktPage.unhidePasswordIcon
    await unhidePasswordIcon.click()

    //Verify design, and it's value to check if user can hide password if it was displayed
    const hidePasswordIcon = ModalBackupKompaktPage.hidePasswordIcon
    await expect(hidePasswordIcon).toBeClickable()
  })

  it("Fill repeat password for a backup, unhide it and verify value and design, verify (passwords do not match)", async () => {
    const repeatInputPassword = ModalBackupKompaktPage.repeatInputPassword
    await repeatInputPassword.click()
    const randomPassword2 = Math.random().toString(36).substring(2, 10)
    await repeatInputPassword.setValue(randomPassword2)

    const checkPassword = await repeatInputPassword.getAttribute("type")
    await expect(checkPassword).toBe("password")

    const unhidePasswordIcon = ModalBackupKompaktPage.unhidePasswordIcon
    await unhidePasswordIcon.click()

    //Verify design and it's value to check if user can hide password if it was displayed
    const hidePasswordIcon = ModalBackupKompaktPage.hidePasswordIcon
    await expect(hidePasswordIcon).toBeClickable()

    const passwordsDoNotMatch = ModalBackupKompaktPage.passwordsDoNotMatch
    await expect(passwordsDoNotMatch).toHaveText("Passwords do not match")
  })

  it("Fill repeat password with first filed password and verify if passwords do not match is gone", async () => {
    const inputPassword = ModalBackupKompaktPage.inputPassword
    const repeatInputPassword = ModalBackupKompaktPage.repeatInputPassword
    const randomPassword = Math.random().toString(36).substring(2, 10)
    await inputPassword.click()
    await inputPassword.clearValue()
    await inputPassword.setValue(randomPassword)

    await repeatInputPassword.click()
    await repeatInputPassword.clearValue()
    await repeatInputPassword.setValue(randomPassword)

    const passwordsDoNotMatch = ModalBackupKompaktPage.passwordsDoNotMatch
    await expect(passwordsDoNotMatch).not.toBeDisplayed()

    const createBackupPasswordConfirm =
      ModalBackupKompaktPage.createBackupPasswordConfirm
    await expect(createBackupPasswordConfirm).toBeClickable()
    await createBackupPasswordConfirm.click()
  })
})
