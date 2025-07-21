/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AppResultFactory } from "app-utils/models"
import { goToSupportModal } from "../helpers/contact-support.helper"
import ContactSupport from "../page-objects/contact-support.page"
import testsHelper from "../helpers/tests.helper"

describe("Contact Support - Happy Path", () => {
  before(async () => {
    await goToSupportModal({
      method: "POST",
      url: "/api/v2/tickets",
      response: AppResultFactory.success(),
    })
  })

  describe("Contact Support Form Modal", () => {
    it("should send a message successfully", async () => {
      await testsHelper.insertTextToElement(
        await ContactSupport.formModalEmailInput,
        "example@mudita.com"
      )
      await testsHelper.insertTextToElement(
        await ContactSupport.formModalDescriptionInput,
        "This is test message from automatic tests execution. Please discard it"
      )

      const sendButton = await ContactSupport.formModalSendButton
      await expect(sendButton).toBeClickable()
      await expect(sendButton).toBeEnabled()
      await expect(sendButton).toHaveText("SEND")

      await sendButton.click()
    })
  })

  describe("Contact Support Sending Modal", () => {
    it("should display modal header and icon", async () => {
      await expect(ContactSupport.sendingModalTitle).toBeDisplayed()
      await expect(ContactSupport.sendingModalTitleIcon).toBeDisplayed()
    })

    it("should not show close button while processing", async () => {
      await expect(ContactSupport.sendingModalCloseButton).not.toBeDisplayed()
    })
  })

  describe("Contact Support Success Modal", () => {
    it("should display all core modal elements", async () => {
      await expect(ContactSupport.successModal).toBeDisplayed()
      await expect(ContactSupport.successModalTitle).toBeDisplayed()
      await expect(ContactSupport.successModalTitleIcon).toBeDisplayed()
      await expect(ContactSupport.successModalDescription).toBeDisplayed()
    })

    it("should display action controls", async () => {
      await expect(ContactSupport.successModalCloseButton).not.toBeDisplayed()
      await expect(ContactSupport.successModalButton).toBeDisplayed()
    })

    it("should allows to close full screen layout when clicking ok modal button", async () => {
      await ContactSupport.successModalButton.waitForDisplayed()
      await ContactSupport.successModalButton.click()
      await expect(ContactSupport.successModal).not.toBeDisplayed()
    })
  })
})
