/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import NavigationTabs from "../../page-objects/tabs.page"
import MessagesPage from "../../page-objects/messages.page"

describe("Messages send", () => {
  before(async () => {
    // Waiting for device connected through USB
    await browser.executeAsync((done) => {
      setTimeout(done, 10000)
    })
  })
  it("Should display fail status if message not send", async () => {
    const messagesTab = await NavigationTabs.messagesTab
    await messagesTab.waitForDisplayed()
    await messagesTab.click()
    await browser.executeAsync((done) => {
      setTimeout(done, 2000)
    })
    //Send new message
    const newMessageBtn = await MessagesPage.newMessageButton
    await newMessageBtn.click()
    const searchInput = await MessagesPage.searchContactsInput
    searchInput.setValue("12345")
    const msgInput = await MessagesPage.messageInput
    msgInput.setValue("test SMS")
    browser.keys("\uE007")
    //wait for sending
    await browser.executeAsync((done) => {
      setTimeout(done, 4000)
    })
    const notSendMessageIcon = await MessagesPage.notSendMessageIcon
    const notSendThreadIcon = await MessagesPage.notSendThreadIcon
    expect(notSendMessageIcon).toBeDisabled()
    expect(notSendThreadIcon).toBeDisabled()
  })
})
