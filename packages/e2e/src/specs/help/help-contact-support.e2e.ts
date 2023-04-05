/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import navigationTabs from "../../page-objects/tabs.page"
import helpPage from "../../page-objects/help.page"
import helpModalPage from "../../page-objects/help-modal.page"
import modalGeneralPage from "../../page-objects/modal-general.page"
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
    await modalGeneralPage.clickUpdateAvailableModalCloseButton()
    await waitForClickableAndClick(await navigationTabs.helpTab)
  })
  it("Navigate to Help, click contact support input email and message and check attachment is present with 'date'.zip format", async () => {
    await browser.switchWindow("#/help")

    await waitForClickableAndClick(await helpPage.contactSupportButton)

    await insertTextToElement(await helpModalPage.emailInput, "e2e@mudita.com")

    await insertTextToElement(
      await helpModalPage.descriptionInput,
      "This is test message from automatic tests execution. Please discard it"
    )

    const attachment = await helpModalPage.singleAttachment
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
    await waitForClickableAndClick(await helpModalPage.sendButton)

    const successModal = await helpModalPage.sentSuccessModal
    await successModal.waitForDisplayed({ timeout: 90000 })
    await expect(successModal).toBeDisplayed()
  })

  it("Close success modal, open new contact support modal and close it, ", async () => {
    await waitForClickableAndClick(await helpModalPage.closeBottomButton)

    await waitForClickableAndClick(await helpPage.contactSupportButton)

    await waitForClickableAndClick(await helpModalPage.closeModalButton)
  })

  it("Open contact support modal and try to send it without any user input ", async () => {
    await waitForClickableAndClick(await helpPage.contactSupportButton)

    await waitForClickableAndClick(await helpModalPage.sendButton)

    await expect(helpModalPage.sendButton).toBeDisabled()
    await waitForClickableAndClick(await helpModalPage.closeModalButton)
  })

  after(async () => {
    try {
      await waitForClickableAndClick(await helpModalPage.closeModalButton)
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
    await modalGeneralPage.clickUpdateAvailableModalCloseButton()
    await waitForClickableAndClick(await navigationTabs.helpTab)
    await browser.pause(4000)
    await browser.switchWindow("#/help")
    await waitForClickableAndClick(await helpPage.contactSupportButton)
  })

  it("Lack of '@' character", async () => {
    await insertTextToElement(await helpModalPage.emailInput, "e2emudita.com")

    await expect(await helpModalPage.invalidEmailTextElement.getText()).toEqual(
      "Email is invalid"
    )
  })

  it("Two '@' characters", async () => {
    await insertTextToElement(await helpModalPage.emailInput, "e2e@@mudita.com")

    await expect(await helpModalPage.invalidEmailTextElement.getText()).toEqual(
      "Email is invalid"
    )
  })

  it("Only '@' and two '..'characters ", async () => {
    await insertTextToElement(await helpModalPage.emailInput, "@..")

    await expect(await helpModalPage.invalidEmailTextElement.getText()).toEqual(
      "Email is invalid"
    )
  })

  it("Correct email to check Email is invalid text stops being displayed", async () => {
    await insertTextToElement(
      await helpModalPage.emailInput,
      "lukasz@mudita.com"
    )

    await expect(
      await helpModalPage.invalidEmailTextElement.getText()
    ).not.toEqual("Email is invalid")
  })
  it("with ',' character", async () => {
    await insertTextToElement(await helpModalPage.emailInput, "e2e@mudita,com")

    await expect(await helpModalPage.invalidEmailTextElement.getText()).toEqual(
      "Email is invalid"
    )
  })
  after(async () => {
    try {
      await waitForClickableAndClick(await helpModalPage.closeModalButton)
    } catch (error) {
      console.log(error)
    }
    await browser.switchWindow("#/overview")
  })
})
