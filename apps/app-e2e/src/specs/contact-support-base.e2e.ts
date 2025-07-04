/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  goToSupportModal,
  openSupportModal,
} from "../helpers/contact-support.helper"
import ContactSupport from "../page-objects/contact-support.page"

describe("Contact Support - Base Path", () => {
  before(async () => {
    await goToSupportModal()
  })

  // --- Modal visibility ---
  it("should display the contact support modal", async () => {
    await expect(ContactSupport.formModal).toBeDisplayed()
  })

  it("should display the modal title", async () => {
    await expect(ContactSupport.formModalTitle).toBeDisplayed()
  })

  it("should display the modal description", async () => {
    await expect(ContactSupport.formModalDescription).toBeDisplayed()
  })

  it("should display the modal icon", async () => {
    await expect(ContactSupport.formModalTitleIcon).toBeDisplayed()
  })

  it("should display the close button", async () => {
    await expect(ContactSupport.formModalCloseButton).toBeDisplayed()
  })

  // --- Email input labels and placeholder ---
  it("should show email input placeholder", async () => {
    const wrapper = await ContactSupport.formModalEmailInputWrapper
    await expect(wrapper).toHaveText("Your email")
  })

  it("should show email input label", async () => {
    await expect(ContactSupport.formModalEmailLabel).toHaveText("Email")
  })

  // --- Message input labels and placeholder ---
  it("should show message input placeholder", async () => {
    const wrapper = await ContactSupport.formModalDescriptionInputWrapper
    await expect(wrapper).toHaveText("How can we help?")
  })

  it("should show message input label", async () => {
    await expect(ContactSupport.formModalDescriptionLabel).toHaveText(
      "Message (optional)"
    )
  })

  // --- Send button and file list info ---
  it("should have send button disabled initially", async () => {
    await expect(ContactSupport.formModalSendButton).toBeDisabled()
  })

  it("should display send button text", async () => {
    await expect(ContactSupport.formModalSendButton).toHaveText("SEND")
  })

  it("should show attached files label and description", async () => {
    await expect(ContactSupport.formModalFileListLabel).toHaveText(
      "Attached files"
    )
    await expect(ContactSupport.formModalFileListDescription).toHaveText(
      "These files will help us understand the problem. They won't be shared with anyone outside Mudita."
    )
  })

  it("should list one attached file with today's date prefix", async () => {
    const files = await ContactSupport.formModalFile
    await expect(files).toHaveLength(1)

    const file = await ContactSupport.formModalSingleFile
    const today = new Date()
    const dd = String(today.getDate()).padStart(2, "0")
    const mm = String(today.getMonth() + 1).padStart(2, "0")
    const yy = String(today.getFullYear()).slice(-2)
    const prefix = `${dd}-${mm}-${yy}`

    await expect(file).toHaveText(`${prefix} Mudita Center.zip`)
  })

  // --- Email validation cases ---
  const invalidEmails = [
    { value: "emailtest.com", error: "Email is invalid" },
    { value: "email@@test.com", error: "Email is invalid" },
    { value: "email@test,com", error: "Email is invalid" },
  ]

  invalidEmails.forEach(({ value, error }) => {
    it(`should display error for invalid email: ${value}`, async () => {
      await ContactSupport.formModalEmailInput.setValue(value)
      await expect(ContactSupport.formModalEmailInputInvalidText).toHaveText(
        error
      )
    })
  })

  it("should clear error when entering valid email", async () => {
    await ContactSupport.formModalEmailInput.setValue("email@test.com")
    await expect(ContactSupport.formModalEmailInputInvalidText).not.toHaveText(
      "Email is invalid"
    )
  })

  // --- Close modal ---
  it("should close the modal when clicking close button", async () => {
    await ContactSupport.formModalCloseButton.waitForDisplayed()
    await ContactSupport.formModalCloseButton.click()
    await expect(ContactSupport.formModal).not.toBeDisplayed()
  })

  it("should re-open the modal after closing", async () => {
    await openSupportModal()
    await expect(ContactSupport.formModal).toBeDisplayed()
    await expect(ContactSupport.formModalEmailInput).toHaveValue("")
    await expect(ContactSupport.formModalDescriptionInput).toHaveValue("")
  })
})
