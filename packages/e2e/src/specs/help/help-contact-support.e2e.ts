/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import NavigationTabs from "../../page-objects/tabs.page"
import HelpPage from "../../page-objects/help.page"
import HelpModalPage from "../../page-objects/help-modal.page"
import ModalGeneralPage from "../../page-objects/modal-general.page"
import {
  waitForClickableAndClick,
  insertTextToElement,
} from "../../helpers/general.helper"

describe("Check Contact Support", () => {
  before(async () => {
    // Waiting for device connected through USB
    await browser.executeAsync((done) => {
      setTimeout(done, 10000)
    })
    await ModalGeneralPage.clickUpdateAvailableModalCloseButton()
    await waitForClickableAndClick(await NavigationTabs.helpTab)
  })
  it("Navigate to Help, click contact support and send a message", async () => {
    await browser.switchWindow("#/help")

    await waitForClickableAndClick(await HelpPage.contactSupportButton)

    await insertTextToElement(await HelpModalPage.emailInput, "e2e@mudita.com")

    await insertTextToElement(
      await HelpModalPage.descriptionInput,
      "This is test message from automatic tests execution. Please discard it"
    )
    await waitForClickableAndClick(await HelpModalPage.sendButton)

    const successModal = await HelpModalPage.sentSuccessModal
    await successModal.waitForDisplayed({ timeout: 40000 })
    await expect(successModal).toBeDisplayed()
  })
  it("Close success modal, open new contact support modal and close it, ", async () => {
    await waitForClickableAndClick(await HelpModalPage.closeBottomButton)

    await waitForClickableAndClick(await HelpPage.contactSupportButton)

    await waitForClickableAndClick(await HelpModalPage.closeModalButton)
  })

  it("Open contact support modal and try to send it without any user input ", async () => {
    await waitForClickableAndClick(await HelpPage.contactSupportButton)

    await waitForClickableAndClick(await HelpModalPage.sendButton)

    await expect(HelpModalPage.sendButton).toBeDisabled()
  })
  after(async () => {
    try {
      await waitForClickableAndClick(await HelpModalPage.closeModalButton)
    } catch (error) {
      console.log(error)
    }
    await browser.switchWindow("#/overview")
  })
})
