/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import NavigationTabs from "../../page-objects/tabs.page"
import MessagesPage from "../../page-objects/messages.page"
import modalMessagesPage from "../../page-objects/modal-messages.page"
import ModalGeneralPage from "../../page-objects/modal-general.page"
import messagesPage from "../../page-objects/messages.page"

describe("Messages send and delete", () => {
  before(async () => {
    // Waiting for device connected through USB
    await browser.executeAsync((done) => {
      setTimeout(done, 10000)
    })

    await ModalGeneralPage.clickCloseOnUpdateAvailableModal()
    //await ModalGeneralPage.clickCloseOnBackgroundUpdateFailedModal()
    await NavigationTabs.messagesTabClick()
  })
  it("Send message to incorrect number using send button", async () => {
    //Send new message
    await messagesPage.sendMessage(
      "12345",
      "SMS to incorrect number (Send button)"
    )
    //wait for sending icon to disappear
    await MessagesPage.waitToDisappearSendingStatusIcon()

    // expect the not sent icon to be displayed on thread details screen and in the middle part of app window - thread list
    const notSendMessageIcon = await MessagesPage.messageNotSentIcon
    await notSendMessageIcon.waitForDisplayed({ timeout: 15000 })
    const notSendThreadIcon = await MessagesPage.messageNotSentThreadIcon
    await notSendThreadIcon.waitForDisplayed({ timeout: 15000 })
    expect(notSendMessageIcon).toBeDisabled()
    expect(notSendThreadIcon).toBeDisabled()
  })
  it("Should delete the thread using delete thread button on open thread screen", async () => {
    //press delete button in the thread

    await MessagesPage.clickThreadDetailScreenDeleteButton()

    // confirm deletion
    await modalMessagesPage.clickConfirmDeleteButton()

    // expect empty thread screen to be displayed
    const emptyThreadList = MessagesPage.threadScreenEmptyList
    await emptyThreadList.waitForDisplayed({ timeout: 7000 })
    await expect(emptyThreadList).toBeDisplayed()
  })

  it("Send message to incorrect number using Enter key", async () => {
    // click New Message Button
    await MessagesPage.clickNewMessageButton()

    // insert recipient number
    await MessagesPage.insertTextToSearchContactInput("54321")

    // insert message text
    await MessagesPage.insertTextToMessageInput(
      "SMS to incorrect number (Enter key send)"
    )
    // send Enter key to send message
    await browser.keys("\uE007")

    //wait for sending icon to disappear
    await MessagesPage.waitToDisappearSendingStatusIcon()

    // expect the not sent icon to be displayed on thread details screen and in the middle part of app window - thread list
    const notSendMessageIcon = await MessagesPage.messageNotSentIcon
    await notSendMessageIcon.waitForDisplayed({ timeout: 15000 })
    const notSendThreadIcon = await MessagesPage.messageNotSentThreadIcon
    await notSendThreadIcon.waitForDisplayed({ timeout: 15000 })
    expect(notSendMessageIcon).toBeDisabled()
    expect(notSendThreadIcon).toBeDisabled()
  })

  it("Should close the thread and delete it from the thread list screen", async () => {
    // press X to close the thread details screen
    await MessagesPage.clickCloseThreadDetailsScreen()

    // press thread options button (...)
    await MessagesPage.clickThreadDropdownIcon()

    //click delete from dropdown
    await MessagesPage.clickThreadDropdownDeleteButton()

    // confirm deletion
    await modalMessagesPage.clickConfirmDeleteButton()

    // expect empty thread screen to be displayed
    const emptyThreadList = MessagesPage.threadScreenEmptyList
    await emptyThreadList.waitForDisplayed({ timeout: 8000 })
    await expect(emptyThreadList).toBeDisplayed()
  })

  it("Send message to incorrect number using send button", async () => {
    //Send new message
    await messagesPage.sendMessage(
      "02468",
      "SMS to incorrect number (Send button)"
    )

    //wait for sending icon to disappear
    await MessagesPage.waitToDisappearSendingStatusIcon()

    // expect the not sent icon to be displayed on thread details screen and in the middle part of app window - thread list
    const notSendMessageIcon = await MessagesPage.messageNotSentIcon
    await notSendMessageIcon.waitForDisplayed({ timeout: 15000 })
    const notSendThreadIcon = await MessagesPage.messageNotSentThreadIcon
    await notSendThreadIcon.waitForDisplayed({ timeout: 15000 })
    expect(notSendMessageIcon).toBeDisabled()
    expect(notSendThreadIcon).toBeDisabled()
  })
  it("Click message options button and delete it", async () => {
    //hover over message to display options button
    await MessagesPage.hoverOverMessageContent()

    //click message options button
    await MessagesPage.clickMessageDropdownIcon()

    //click delete from dropdown options list
    await MessagesPage.clickMessageDropdownDeleteButton()

    // confirm deletion
    await modalMessagesPage.clickConfirmDeleteButton()

    // expect empty thread screen to be displayed
    const emptyThreadList = MessagesPage.threadScreenEmptyList
    await emptyThreadList.waitForDisplayed({ timeout: 8000 })
    await expect(emptyThreadList).toBeDisplayed()
  })

  it("Send message to incorrect number using send button", async () => {
    //Send new message
    await messagesPage.sendMessage(
      "13579",
      "SMS to incorrect number (Send button)"
    )

    //wait for sending icon to disappear
    await MessagesPage.waitToDisappearSendingStatusIcon()

    // expect the not sent icon to be displayed on thread details screen and in the middle part of app window - thread list
    const notSendMessageIcon = await MessagesPage.messageNotSentIcon
    await notSendMessageIcon.waitForDisplayed({ timeout: 15000 })
    const notSendThreadIcon = await MessagesPage.messageNotSentThreadIcon
    await notSendThreadIcon.waitForDisplayed({ timeout: 15000 })
    expect(notSendMessageIcon).toBeDisabled()
    expect(notSendThreadIcon).toBeDisabled()
  })
  it("Should close the thread and delete thread using selection manager", async () => {
    // press X to close the thread details screen
    await MessagesPage.clickCloseThreadDetailsScreen()

    //hover over single thread row
    await MessagesPage.hoverOverThreadRow()

    //click selection manager checkbox
    await MessagesPage.clickThreadCheckbox()

    //click Delete button for Selection manager
    await MessagesPage.clickSelectionManagerDeleteButton()

    // confirm deletion
    await modalMessagesPage.clickConfirmDeleteButton()

    // expect empty thread screen to be displayed
    const emptyThreadList = MessagesPage.threadScreenEmptyList
    await emptyThreadList.waitForDisplayed({ timeout: 8000 })
    await expect(emptyThreadList).toBeDisplayed()
  })
})
