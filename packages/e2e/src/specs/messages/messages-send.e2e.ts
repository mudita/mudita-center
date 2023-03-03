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

    //ModalGeneralPage.closeModalButtonClick()
    NavigationTabs.messagesTabClick()
    await browser.pause(2000)
  })
  it("Send message to incorrect number using send button", async () => {
    //Send new message
    await messagesPage.sendMessage(
      "12345",
      "SMS to incorrect number (Send button)"
    )

    //wait for sending and for failed send icons to appear
    //browser.pause(4000)
    const notSendMessageIcon = await MessagesPage.iconNotSendMessage
    await notSendMessageIcon.waitForDisplayed({ timeout: 7000 })
    const notSendThreadIcon = await MessagesPage.iconNotSendThread
    await notSendThreadIcon.waitForDisplayed({ timeout: 7000 })
    expect(notSendMessageIcon).toBeDisabled()
    expect(notSendThreadIcon).toBeDisabled()
  })
  it("Should delete the thread using delete thread button on open thread screen", async () => {
    //press delete button in the thread

    await MessagesPage.clickDeleteButtonOnConversationDetailsScreen()

    await modalMessagesPage.buttonConfirmDeleteClick()

    const emptyThreadList = MessagesPage.listEmptyThread
    await emptyThreadList.waitForDisplayed({ timeout: 7000 })
    await expect(emptyThreadList).toBeDisplayed()

    //delay for status popup to disappear
    await browser.pause(5000)
  })

  it("Send message to incorrect number using Enter key", async () => {
    // click New Message Button
    await MessagesPage.clickNewMessageButton()
    await MessagesPage.insertTextToSearchContactInput("54321")
    await MessagesPage.insertTextToMessageInput(
      "SMS to incorrect number (Enter key send)"
    )
    // Enter key press
    await browser.keys("\uE007")

    const notSendMessageIcon = await MessagesPage.iconNotSendMessage
    //extended time to  wait for delete status popup to dissappear
    await notSendMessageIcon.waitForDisplayed({ timeout: 10000 })
    const notSendThreadIcon = await MessagesPage.iconNotSendThread
    await notSendThreadIcon.waitForDisplayed({ timeout: 10000 })
    expect(notSendMessageIcon).toBeDisabled()
    expect(notSendThreadIcon).toBeDisabled()
  })

  it("Should close the thread and delete it from the thread list screen", async () => {
    // press X to close the thread details screen
    await MessagesPage.clickCloseThreadDetailsScreen()
    // press thread options button (...)
    await MessagesPage.clickThreadOptionsButton()
    //click delete from dropdown
    await MessagesPage.clickDropdownThreadOptionDelete()
    //confirm delete operation
    await modalMessagesPage.buttonConfirmDeleteClick()

    const emptyThreadList = MessagesPage.listEmptyThread
    await emptyThreadList.waitForDisplayed({ timeout: 8000 })
    await expect(emptyThreadList).toBeDisplayed()
  })

  it("Send message to incorrect number using send button", async () => {
    //Send new message
    await messagesPage.sendMessage(
      "02468",
      "SMS to incorrect number (Send button)"
    )

    //wait for sending and for failed send icons to appear
    //browser.pause(4000)
    const notSendMessageIcon = await MessagesPage.iconNotSendMessage
    await notSendMessageIcon.waitForDisplayed({ timeout: 7000 })
    const notSendThreadIcon = await MessagesPage.iconNotSendThread
    await notSendThreadIcon.waitForDisplayed({ timeout: 7000 })
    expect(notSendMessageIcon).toBeDisabled()
    expect(notSendThreadIcon).toBeDisabled()
  })
  it("Click message options button and delete it", async () => {
    //Send new message
    await browser.pause(9000)
    await MessagesPage.hoverOverMessage()

    await MessagesPage.clickMessageOptionsButton()
    await browser.saveScreenshot("./Screen.png")
    await MessagesPage.clickDeleteMessage()

    await modalMessagesPage.buttonConfirmDeleteClick()

    const emptyThreadList = MessagesPage.listEmptyThread
    await emptyThreadList.waitForDisplayed({ timeout: 7000 })
    await expect(emptyThreadList).toBeDisplayed()
  })

  it("Send message to incorrect number using send button", async () => {
    //Send new message
    await messagesPage.sendMessage(
      "13579",
      "SMS to incorrect number (Send button)"
    )
    const notSendMessageIcon = await MessagesPage.iconNotSendMessage
    await notSendMessageIcon.waitForDisplayed({ timeout: 7000 })
    const notSendThreadIcon = await MessagesPage.iconNotSendThread
    await notSendThreadIcon.waitForDisplayed({ timeout: 7000 })
    expect(notSendMessageIcon).toBeDisabled()
    expect(notSendThreadIcon).toBeDisabled()
  })
  it("Should close the thread and delete thread using selection manager", async () => {
    // press X to close the thread details screen
    await MessagesPage.clickCloseThreadDetailsScreen()

    await MessagesPage.hoverOverSingleThreadRow()

    await MessagesPage.clickThreadCheckbox()

    await MessagesPage.clickDeleteButtonSelectionMaanager()

    await modalMessagesPage.buttonConfirmDeleteClick()

    await browser.saveScreenshot("./Screenshot1.png")
    const emptyThreadList = MessagesPage.listEmptyThread
    await emptyThreadList.waitForDisplayed({ timeout: 8000 })
    await expect(emptyThreadList).toBeDisplayed()
  })
})
