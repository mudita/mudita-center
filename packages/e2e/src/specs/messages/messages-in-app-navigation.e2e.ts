/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import NavigationTabs from "../../page-objects/tabs.page"
import MessagesPage from "../../page-objects/messages.page"

describe("Messages screen check", () => {
  before(async () => {
    // Waiting for device connected through USB
    await browser.executeAsync((done) => {
      setTimeout(done, 10000)
    })
  })
  it("Should click Messages tab and check 'new message' button is displayed", async () => {
    const messagesTab = await NavigationTabs.messagesTab
    await messagesTab.waitForDisplayed()
    await messagesTab.click()
    await browser.executeAsync((done) => {
      setTimeout(done, 2000)
    })
    const newMessageBtn = await MessagesPage.newMessageButton
    await expect(newMessageBtn).toBeDisplayed()
  })

  it("Should click 'New Message' button and check it will become disabled", async () => {
    const newMessageBtn = await MessagesPage.newMessageButton
    await newMessageBtn.click()
    await expect(newMessageBtn).toBeDisabled()
  })

  it("Should check 'Search Contacts' input field is displayed", async () => {
    const searchInput = await MessagesPage.searchContactsInput
    await expect(searchInput).toBeDisplayed()
  })

  it("Should check if 'message' input field is displayed", async () => {
    const msgInput = await MessagesPage.messageInput
    await expect(msgInput).toBeDisplayed()
  })
})
