/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import NavigationTabs from "../../page-objects/tabs.page"
import MessagesPage from "../../page-objects/messages.page"
import ModalGeneralPage from "../../page-objects/modal-general.page"
import MessagesConversationPage from "../../page-objects/messages-conversation.page"

import {
  deleteConversationOnThreadList,
  sendMessage,
} from "../../helpers/messages.helper"

describe("Mark conversation as unred/read/unread", () => {
  before(async () => {
    // Waiting for device connected through USB
    await browser.executeAsync((done) => {
      setTimeout(done, 10000)
    })

    await ModalGeneralPage.clickUpdateAvailableModalCloseButton()
    await NavigationTabs.clickMessagesTab()
  })
  it("Send message to incorrect number and click MARK AS UNREAD button thread details screen", async () => {
    await sendMessage("14710", "Mark as unread test")

    await MessagesConversationPage.waitToDisappearSendingStatusIcon()

    await MessagesConversationPage.clickThreadDetailScreenMarkAsUnreadButton()

    const threadDetails = MessagesPage.threadScreenEmptyList
    await expect(threadDetails).not.toBeDisplayed()

    const messages = await MessagesPage.getLastMessages()
    await expect(messages[0].text).toBe("Mark as unread test")
    await expect(await messages[0].dotDisplayed).toBeTruthy()
  })

  it("Click options button on thread list screen and click MARK AS READ on dropdown", async () => {
    await MessagesPage.clickThreadDropdownIcon()

    const markAsDropdown = MessagesPage.textOptionMarkAsReadDropdown
    await expect(markAsDropdown).toHaveText("MARK AS READ")

    await MessagesPage.clickThreadDropdownMarkAsReadButton()

    const messages = await MessagesPage.getLastMessages()
    await expect(messages[0].text).toBe("Mark as unread test")
    await expect(await messages[0].dotDisplayed).toBeFalsy()
  })

  it("Click options button on thread list screen and click MARK AS UNREAD on dropdown", async () => {
    await MessagesPage.clickThreadDropdownIcon()

    const markAsDropdown = MessagesPage.textOptionMarkAsReadDropdown
    await expect(markAsDropdown).toHaveText("MARK AS UNREAD")

    await MessagesPage.clickThreadDropdownMarkAsReadButton()
    const messages = await MessagesPage.getLastMessages()
    await expect(messages[0].text).toBe("Mark as unread test")
    await expect(await messages[0].dotDisplayed).toBeTruthy()
  })
  after(async () => {
    await deleteConversationOnThreadList()
  })
})
