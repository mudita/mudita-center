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
  it("Send message to incorrect number and click mark as unread button thread details screen", async () => {
    //Send new message
    await messagesPage.sendMessage("14710", "Mark as unread test")
    //wait for sending icon to disappear
    await MessagesPage.waitForSendingIconToDisappear()

    await MessagesPage.clickMarkUnreadButtonOnThreadDetailScreen()

    const threadDetails = MessagesPage.threadDetailsScreen
    await expect(threadDetails).not.toBeDisplayed()
  })

  it("Click options button on thread list screen and click MARK AS READ option", async () => {
    // press thread options button (...)
    await MessagesPage.clickThreadOptionsButton()

    //check dropdown option is MARK AS READ and click it
    const markAsDropdown = MessagesPage.textOptionMarkAsReadDropdown
    await expect(markAsDropdown).toHaveText("MARK AS READ")

    //click Mark As Read from dropdown
    await MessagesPage.clickOptionMarkAsReadDropdown()
  })

  it("Click options button on thread list screen and click MARK AS UNREAD option", async () => {
    // press thread options button (...)
    await MessagesPage.clickThreadOptionsButton()

    //check dropdown option is MARK AS READ and click it
    const markAsDropdown = MessagesPage.textOptionMarkAsReadDropdown
    await expect(markAsDropdown).toHaveText("MARK AS UNREAD")

    //click Mark As Read from dropdown
    await MessagesPage.clickOptionMarkAsReadDropdown()
  })
})
