/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import NavigationTabs from "../../page-objects/tabs.page"
import HomePage from "../../page-objects/home.page"
import { sleep } from "../../helpers/sleep.helper"
import HelpModalPage from "../../page-objects/help-modal.page"
import NewHelpPage from "../../page-objects/newhelp.page"
import ContactSupportSuccessModalPage from "../../page-objects/contact-support-success-modal.page"
import testsHelper from "../../helpers/tests.helper"
import dns from "node:dns"
import screenshotHelper from "../../helpers/screenshot.helper"

/**
 * Check if contact support shows up
Check contents of Contact Form
Check if send button exists, it is called “Send” and it is clickable.
[Screenshot]
Fill the form correctly
Check fields
Verify attachment field - add assertion to check attachment date to be current date 
Click send button - Use mocking to intercept request and prepare a response mock | WebdriverIO Intercept Service | WebdriverIO 
Close success modal
Close Contact Support window :warning: Wait
Verify Result - check if Contact Support modal is not visible.
 */
describe("Mock Using Contact Support Form", () => {
  before(async () => {
    dns.setDefaultResultOrder("ipv4first")
    const notNowButton = await HomePage.notNowButton
    await notNowButton.waitForDisplayed()
    await notNowButton.click()
    await sleep(20000)
  })

  it("Open Help window and check if Contact Support modal opens up", async () => {
    const helpTab = await NavigationTabs.helpTab
    await helpTab.waitForDisplayed({ timeout: 15000 })
    await helpTab.click()

    const iconContactSupport = await NewHelpPage.iconContactSupport
    await iconContactSupport.waitForDisplayed()
    await iconContactSupport.click()
  })

  it("Check contents of Mudita Help Contact Support", async () => {
    const emailInput = await HelpModalPage.emailInput
    await emailInput.waitForDisplayed()
    await emailInput.waitForEnabled()
    await expect(emailInput).toHaveAttributeContaining(
      "placeholder",
      "Your email"
    )

    const descriptionInput = await HelpModalPage.descriptionInput
    await descriptionInput.waitForDisplayed()
    await descriptionInput.waitForEnabled()
    await expect(descriptionInput).toHaveAttributeContaining(
      "placeholder",
      "How can we help?"
    )

    const attachmentsList = await HelpModalPage.attachmentsList()
    await expect(attachmentsList).toHaveLength(1)

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

  it("Fill and send the form correctly", async () => {
    await testsHelper.insertTextToElement(
      await HelpModalPage.emailInput,
      "tomasz.malecki@mudita.com"
    )

    await testsHelper.insertTextToElement(
      await HelpModalPage.descriptionInput,
      "This is test message from automatic tests execution. Please discard it"
    )

    const sendButton = await HelpModalPage.sendButton
    await expect(sendButton).toBeClickable()
    await expect(sendButton).toBeEnabled()
    await expect(sendButton).toHaveText("SEND")
    /**
     * type: Problem
email: tomasz.malecki@mudita.com
subject: Error
description: Test 29.08.2024 - Send to @Tomasz Malecki
status: 2
source: 100
priority: 1
custom_fields[cf_product]: None
attachments[]: (binary)
     */

    const strictResponseMock = await browser.mock(
      "https://mudita.freshdesk.com/api/v2/tickets"
    )

    //https://developers.freshdesk.com/api/#create_ticket
    await strictResponseMock.respond(
      { 
        dummyBody: {
          "cc_emails": [],
          "fwd_emails": [],
          "reply_cc_emails": [],
          "ticket_cc_emails": [],
          "fr_escalated": false,
          "spam": false,
          "email_config_id": null,
          "group_id": null,
          "priority": 1,
          "requester_id": 77076673024,
          "responder_id": null,
          "source": 100,
          "company_id": null,
          "status": 2,
          "subject": "Error",
          "support_email": null,
          "to_emails": null,
          "product_id": null,
          "id": 24594,
          "type": "Problem",
          "due_by": "2024-09-04T06:56:47Z",
          "fr_due_by": "2024-08-31T06:56:47Z",
          "is_escalated": false,
          "description": "<div>Test 29.08.2024 - Send to @Tomasz Malecki</div>",
          "description_text": "Test 29.08.2024 - Send to @Tomasz Malecki",
          "custom_fields": {
              "cf_serial_number_imei": null,
              "cf_product": "None",
              "cf_serial_number": null,
              "cf_fsm_contact_name": null,
              "cf_device": null,
              "cf_fsm_phone_number": null,
              "cf_order_number": null,
              "cf_fsm_service_location": null,
              "cf_country": null,
              "cf_fsm_appointment_start_time": null,
              "cf_operator": null,
              "cf_fsm_appointment_end_time": null,
              "cf_signal_strength": null,
              "cf_os_version": null,
              "cf_order_number682447": null,
              "cf_tracking_number": null,
              "cf_product_problem": null
          },
          "created_at": "2024-08-29T06:56:47Z",
          "updated_at": "2024-08-29T06:56:47Z",
          "tags": [],
          "attachments": [
              {
                  "id": 77181985843,
                  "content_type": "application/octet-stream",
                  "size": 129076,
                  "name": "2024-08-29.zip",
                  "attachment_url": "https://s3.eu-central-1.amazonaws.com/euc-cdn.freshdesk.com/data/helpdesk/attachments/production/77181985843/original/2024-08-29.zip?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAS6FNSMY2XLZULJPI%2F20240829%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20240829T065648Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=65d486f936d04823cbfa0cd2b6b035de55a145827ffb4e2da76ab6aa151b7092",
                  "created_at": "2024-08-29T06:56:47Z",
                  "updated_at": "2024-08-29T06:56:47Z"
              }
          ],
          "nr_due_by": null,
          "nr_escalated": false
        },
      },
      {
        statusCode: 201,
      }
    )

    await sendButton.click()

    console.log(await strictResponseMock.calls)

    expect(strictResponseMock.calls.length).toBe(1)

    const closeButton = await ContactSupportSuccessModalPage.closeModalButton
    await expect(closeButton).toBeDisplayed()
    await expect(closeButton).toBeClickable()
    await closeButton.click()
    
    await screenshotHelper.makeViewScreenshot()
    const successIcon = await ContactSupportSuccessModalPage.successIcon
    await expect(successIcon).toBeDisplayed()

    await sleep(3000000)

    const modalHeaderTitle = await ContactSupportSuccessModalPage.modalHeaderTitle
    await expect(modalHeaderTitle).toBeDisplayed()
    await expect(modalHeaderTitle).toHaveText("Message sent")

    const modalHeaderDescription = await ContactSupportSuccessModalPage.modalHeaderDescription
    await expect(modalHeaderDescription).toBeDisplayed()
    await expect(modalHeaderDescription).toHaveText("We will contact you as soon as the problem is resolved")

    const modalSuccessCloseButton = await ContactSupportSuccessModalPage.modalSuccessCloseButton
    await expect(modalSuccessCloseButton).toBeDisplayed()
    await expect(modalSuccessCloseButton).toHaveText("Close")
    modalSuccessCloseButton.click()
    

    const iconContactSupport = await NewHelpPage.iconContactSupport
    await iconContactSupport.scrollIntoView()
    await iconContactSupport.waitForDisplayed()
    await expect(iconContactSupport).toBeClickable()

  })
})
