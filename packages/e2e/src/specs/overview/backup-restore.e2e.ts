/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import NavigationTabs from "../../page-objects/tabs.page"
import OverviewPage from "../../page-objects/overview.page"
import ModalBackupRestorePage from "../../page-objects/modal-backup-restore.page"
import ModalGeneralPage from "../../page-objects/modal-general.page"

describe("Backup&Restore tests", () => {
  before(async () => {
    // Waiting for device connected through USB
    await browser.executeAsync((done) => {
      setTimeout(done, 10000)
    })
    ModalGeneralPage.closeModalButtonClick()
    NavigationTabs.overviewTabClick()
  })

  it("Check backup can be created", async () => {
    const createBackupButton = OverviewPage.createBackupButton
    await createBackupButton.waitForDisplayed({ timeout: 4000 })
    await createBackupButton.click()

    const createBackupModalButton =
      ModalBackupRestorePage.createBackupModalButton
    await createBackupModalButton.waitForDisplayed({ timeout: 8000 })
    await createBackupModalButton.click()

    const inputPasswordFirstInput =
      ModalBackupRestorePage.backupPasswordFirstInput
    const inputPasswordSecondnput =
      ModalBackupRestorePage.backupPasswordSecondInput
    await inputPasswordFirstInput.waitForDisplayed({ timeout: 4000 })
    await inputPasswordFirstInput.setValue("Mudita123!")
    await inputPasswordSecondnput.setValue("Mudita123!")

    const confirmBackupButton = ModalBackupRestorePage.backupSubmitButton
    await confirmBackupButton.click()

    const checkMarkIcon = ModalBackupRestorePage.checkCircleIcon
    await checkMarkIcon.waitForDisplayed({ timeout: 20000 })
    await expect(checkMarkIcon).toBeDisplayed()

    ModalGeneralPage.closeModalButtonClick()
  })

  it("Should display failed modal for incorrect password", async () => {
    const restoreBackupButton = await OverviewPage.restoreBackupButton
    await restoreBackupButton.waitForDisplayed({ timeout: 4000 })
    await restoreBackupButton.click()
    //timeout to wait for backup list display
    await browser.executeAsync((done) => {
      setTimeout(done, 2000)
    })

    const storedBackups = await ModalBackupRestorePage.listOfBackups
    expect(storedBackups.length).toBeGreaterThan(0)
    await storedBackups[0].$("<p>").click()
    const confirmRestoreModal = ModalBackupRestorePage.restoreButton
    await confirmRestoreModal.waitForDisplayed({ timeout: 6000 })
    await confirmRestoreModal.click()

    const restorePasswordInput = ModalBackupRestorePage.restorePasswordInput
    await restorePasswordInput.waitForDisplayed({ timeout: 6000 })
    await restorePasswordInput.click()
    await restorePasswordInput.setValue("Mudita123!@")

    const restoreSubmitButton = ModalBackupRestorePage.restoreSubmitButton
    await restoreSubmitButton.waitForDisplayed({ timeout: 6000 })
    await restoreSubmitButton.click()

    const failModalIcon = ModalBackupRestorePage.failModalIcon
    await failModalIcon.waitForDisplayed({ timeout: 10000 })
    await expect(failModalIcon).toBeDisplayed()

    ModalGeneralPage.closeModalButtonClick()
  })

  it("should display success modal for successful restore operation", async () => {
    const restoreBackupButton = await OverviewPage.restoreBackupButton
    await restoreBackupButton.waitForDisplayed({ timeout: 4000 })
    await restoreBackupButton.click()
    //timeout to wait for backup list display
    await browser.executeAsync((done) => {
      setTimeout(done, 2000)
    })

    const storedBackups = await ModalBackupRestorePage.listOfBackups
    expect(storedBackups.length).toBeGreaterThan(0)

    await storedBackups[0].$("<p>").click()
    const confirmRestoreModal = ModalBackupRestorePage.restoreButton
    await confirmRestoreModal.waitForDisplayed({ timeout: 6000 })
    await confirmRestoreModal.click()
    const restorePasswordInput = ModalBackupRestorePage.restorePasswordInput
    await restorePasswordInput.waitForDisplayed({ timeout: 6000 })
    await restorePasswordInput.click()
    await restorePasswordInput.setValue("Mudita123!")
    const restoreSubmitButton = ModalBackupRestorePage.restoreSubmitButton
    await restoreSubmitButton.waitForDisplayed({ timeout: 6000 })
    await restoreSubmitButton.click()
    await browser.executeAsync((done) => {
      setTimeout(done, 20000)
    })
    const OKModalIcon = ModalBackupRestorePage.checkCircleIcon
    await OKModalIcon.waitForDisplayed({ timeout: 30000 })
    await expect(OKModalIcon).toBeDisplayed()

    ModalGeneralPage.closeModalButtonClick()
  })
})
