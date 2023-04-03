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
  it("Navigate to Help, click contact support input email and message and check attachment is present with 'date'.zip format", async () => {
    await browser.switchWindow("#/help")

    await waitForClickableAndClick(await HelpPage.contactSupportButton)

    await insertTextToElement(await HelpModalPage.emailInput, "e2e@mudita.com")

    await insertTextToElement(
      await HelpModalPage.descriptionInput,
      "This is test message from automatic tests execution. Please discard it"
    )

    const attachment = await HelpModalPage.singleAttachment
    const d = new Date()
    const day = d.getDate()
    const month = d.getMonth() + 1
    const year = d.getFullYear()
    await expect(attachment).toHaveText(
      `${year}-${(month > 9 ? "" : "0") + month}-${
        (day > 9 ? "" : "0") + day
      }.zip`
    )
  })

  it("Click send button and wait for message is sent", async () => {
    await waitForClickableAndClick(await HelpModalPage.sendButton)

    const successModal = await HelpModalPage.sentSuccessModal
    await successModal.waitForDisplayed({ timeout: 90000 })
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
    await waitForClickableAndClick(await HelpModalPage.closeModalButton)
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
describe("Validate email scenarios on contact support modal", () => {
  before(async () => {
    // Waiting for device connected through USB
    await browser.executeAsync((done) => {
      setTimeout(done, 10000)
    })
    await ModalGeneralPage.clickUpdateAvailableModalCloseButton()
    await waitForClickableAndClick(await NavigationTabs.helpTab)
    await browser.pause(4000)
    await browser.switchWindow("#/help")
    await waitForClickableAndClick(await HelpPage.contactSupportButton)
  })

  it("Lack of '@' character", async () => {
    await insertTextToElement(await HelpModalPage.emailInput, "e2emudita.com")

    await expect(await HelpModalPage.invalidEmailTextElement.getText()).toEqual(
      "Email is invalid"
    )
  })

  it("Two '@' characters", async () => {
    await insertTextToElement(await HelpModalPage.emailInput, "e2e@@mudita.com")

    await expect(await HelpModalPage.invalidEmailTextElement.getText()).toEqual(
      "Email is invalid"
    )
  })

  it("Only '@' and two '..'characters ", async () => {
    await insertTextToElement(await HelpModalPage.emailInput, "@..")

    await expect(await HelpModalPage.invalidEmailTextElement.getText()).toEqual(
      "Email is invalid"
    )
  })

  it("Correct email to check Email is invalid text stops being displayed", async () => {
    await insertTextToElement(
      await HelpModalPage.emailInput,
      "lukasz@mudita.com"
    )

    await expect(
      await HelpModalPage.invalidEmailTextElement.getText()
    ).not.toEqual("Email is invalid")
  })
  it("with ',' character", async () => {
    await insertTextToElement(await HelpModalPage.emailInput, "e2e@mudita,com")

    await expect(await HelpModalPage.invalidEmailTextElement.getText()).toEqual(
      "Email is invalid"
    )
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
