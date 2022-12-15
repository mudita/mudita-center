/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */
const path = require("path")
import NavigationTabs from "../../page-objects/tabs.page"
import ContactsPage from "../../page-objects/contacts.page"
import ModalGeneralPage from "../../page-objects/modal-general.page"
import modalContactsPage from "../../page-objects/modal-contacts.page"

describe("import vcf, google, outlook", () => {
  before(async () => {
    // Waiting for device connected through USB
    await browser.executeAsync((done) => {
      setTimeout(done, 13000)
    })

    ModalGeneralPage.closeModalButtonClick()
    await browser.executeAsync((done) => {
      setTimeout(done, 3000)
    })
    NavigationTabs.contactsTabClick()
    await browser.executeAsync((done) => {
      setTimeout(done, 1000)
    })
  })

  it("Should import contacts from vcf file", async () => {
    //path to the test vcf file for this and search-selection-manager test
    const filePath = path.join(
      __dirname,
      "../contacts/vcf-files/52Contacts-E2E-tests.vcf"
    )
    const remoteFilePath = await browser.uploadFile(filePath)

    //click import button on contacts page
    const importButton = ContactsPage.importButton
    await importButton.click()
    //click import from vcf file button
    await ContactsPage.inputHiddenVcfFile.waitForExist()
    await ContactsPage.buttonImportFromVCFFileImport.click()

    //unhide the hidden input placeholder for the vcf file path
    const result2 = await browser.execute(function () {
      let inputHidden = document.querySelector(
        '[data-testid="file-input"]'
      ) as HTMLElement
      inputHidden.style.display = "block"
      return inputHidden
    })
    //wait for input to be visible and set the vcf file path as its value
    await ContactsPage.inputHiddenVcfFile.waitForDisplayed()
    await ContactsPage.inputHiddenVcfFile.setValue(remoteFilePath)

    await browser.executeAsync((done) => {
      setTimeout(done, 5000)
    })
    //click import on modal
    const importBtn = modalContactsPage.buttonImport
    await importBtn.waitForDisplayed()
    await importBtn.click()

    //wait for saving completed text (adjust the timeout for large vcf imports)
    const savingCompleted = modalContactsPage.textSavingCompleted
    await savingCompleted.waitForDisplayed({ timeout: 60000 })
    await expect(savingCompleted).toBeDisplayed()

    // wait for OK button to be displayed
    const okBtn = modalContactsPage.buttonOK
    await okBtn.waitForDisplayed()
    await expect(okBtn).toBeDisplayed()
    await okBtn.click()
  })
})
