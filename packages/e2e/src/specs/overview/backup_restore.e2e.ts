import NavigationTabs from "../../page-objects/tabs.page"
import OverviewPage from "../../page-objects/overview.page"
import ModalBackupRestorePage from "../../page-objects/modal.backup.restore"

describe("Backup&Restore tests", () => {
  before(async () => {
    // Waiting for device connected through USB
    await browser.executeAsync((done) => {
      setTimeout(done, 10000)
    })
  })
  it("Restore -> incorrect password", async () => {
    const restoreBackupButton = await OverviewPage.restoreBackupButton
    await restoreBackupButton.waitForDisplayed({ timeout: 4000 })
    await restoreBackupButton.click()
    //timeout to wait for backup list display
    await browser.executeAsync((done) => {
      setTimeout(done, 2000)
    })

    const storedBackups = await ModalBackupRestorePage.listOfBackups
    if (storedBackups.length > 0) {
      await storedBackups[0].$("<p>").click()
      const confirmRestoreModal = ModalBackupRestorePage.restoreButton
      await confirmRestoreModal.waitForDisplayed({ timeout: 6000 })
      await confirmRestoreModal.click()
      const restorePasswordInput = ModalBackupRestorePage.restorePasswordInput
      await restorePasswordInput.waitForDisplayed({ timeout: 6000 })
      await restorePasswordInput.click()
      await restorePasswordInput.setValue("Mudita123!@")
      console.log(await restorePasswordInput.getValue())
      const restoreSubmitButton = ModalBackupRestorePage.restoreSubmitButton
      await restoreSubmitButton.waitForDisplayed({ timeout: 6000 })
      console.log(await restoreSubmitButton.getValue())
      await restoreSubmitButton.click()
      const failModalIcon = ModalBackupRestorePage.failModalIcon
      await failModalIcon.waitForDisplayed({ timeout: 10000 })
      await expect(failModalIcon).toBeDisplayed()
    } else {
      expect(false).toBeTruthy()
    }

    await browser.executeAsync((done) => {
      setTimeout(done, 8000)
    })
  })

  it("Restore -> correct password", async () => {
    const restoreBackupButton = await OverviewPage.restoreBackupButton
    await restoreBackupButton.waitForDisplayed({ timeout: 4000 })
    await restoreBackupButton.click()
    //timeout to wait for backup list display
    await browser.executeAsync((done) => {
      setTimeout(done, 2000)
    })

    const storedBackups = await ModalBackupRestorePage.listOfBackups
    if (storedBackups.length > 0) {
      await storedBackups[0].$("<p>").click()
      const confirmRestoreModal = ModalBackupRestorePage.restoreButton
      await confirmRestoreModal.waitForDisplayed({ timeout: 6000 })
      await confirmRestoreModal.click()
      const restorePasswordInput = ModalBackupRestorePage.restorePasswordInput
      await restorePasswordInput.waitForDisplayed({ timeout: 6000 })
      await restorePasswordInput.click()
      await restorePasswordInput.setValue("Mudita123!")
      console.log(await restorePasswordInput.getValue())
      const restoreSubmitButton = ModalBackupRestorePage.restoreSubmitButton
      await restoreSubmitButton.waitForDisplayed({ timeout: 6000 })
      console.log(await restoreSubmitButton.getValue())
      await restoreSubmitButton.click()
      const failModalIcon = ModalBackupRestorePage.checkCircleIcon
      await failModalIcon.waitForDisplayed({ timeout: 10000 })
      await expect(failModalIcon).toBeDisplayed()
    } else {
      expect(false).toBeTruthy()
    }

    await browser.executeAsync((done) => {
      setTimeout(done, 8000)
    })
  })
  xit("Check backup can be created", async () => {
    await NavigationTabs.overviewTabClick()

    const createBackupButton = OverviewPage.createBackupButton
    await createBackupButton.waitForDisplayed({ timeout: 4000 })
    await createBackupButton.click()

    const createBackupModalButton = ModalBackupRestorePage.confirmModalButton
    await createBackupModalButton.waitForDisplayed({ timeout: 4000 })
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

    await createBackupModalButton.waitForDisplayed({ timeout: 4000 })
    await createBackupModalButton.click()
  })
})
