/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import NavigationTabs from "../../page-objects/tabs.page"
import HelpPage from "../../page-objects/help.page"
import HomePage from "../../page-objects/home.page"
import { sleep } from "../../helpers/sleep.helper"
import HelpModalPage from "../../page-objects/help-modal.page"
import NewHelpPage from "../../page-objects/newhelp.page"
import testsHelper from "../../helpers/tests.helper"
import dns from "node:dns"

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

  it("Fill the form correctly", async () => {
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

    console.log(await browser.status())
    console.log(await browser.getUrl())
    console.log(await browser.getTitle())
    console.log(await browser.getWindowHandle())

    const strictResponseMock = await browser.mock(
      "https://mudita.freshdesk.com/api/v2/tickets"
    )

    await strictResponseMock.respond(
      { dummyBody: "body" },
      {
        statusCode: 501,
      }
    )

    await sendButton.click()
    await sleep(3000)

    expect(strictResponseMock.calls.length).toBe(1)

    await sleep(300000)
  })
})
