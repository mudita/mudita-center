/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { E2EMockClient } from "e2e-mock/client"
import { MockAppHttpResponsePayload } from "app-utils/models"
import Menu from "../page-objects/menu.page"
import HelpPage from "../page-objects/help.page"
import ContactSupport from "../page-objects/contact-support.page"
import testsHelper from "./tests.helper"

export async function goToSupportModal(payload?: MockAppHttpResponsePayload) {
  if (process.env.MOCK_SERVER_ENABLED === "1" && payload) {
    await E2EMockClient.connect()
    E2EMockClient.mockAppHttpResponse(payload)
  }
  // should open Mudita Help Center
  const helpTab = await Menu.helpLink
  await helpTab.waitForDisplayed()
  await helpTab.click()

  await openSupportModal()
}

export async function openSupportModal() {
  // should open Contact Support modal
  const csButton = await HelpPage.contactSupportButton
  await csButton.waitForDisplayed()
  await csButton.click()

  // should wait for Contact Support modal to be displayed
  await (await ContactSupport.formModalTitle).waitForDisplayed()
}

export const itBehavesLikeFormModal = () => {
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
}

export const itBehavesLikeSendingModal = () => {
  describe("Contact Support Sending Modal", () => {
    it("should display modal header and icon", async () => {
      await expect(ContactSupport.sendingModalTitle).toBeDisplayed()
      await expect(ContactSupport.sendingModalTitleIcon).toBeDisplayed()
    })

    it("should not show close button while processing", async () => {
      await expect(ContactSupport.sendingModalCloseButton).not.toBeDisplayed()
    })
  })
}
