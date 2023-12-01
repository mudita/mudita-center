/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import NavigationTabs from "../../page-objects/tabs.page"

describe("Contacts screen check", () => {
  before(async () => {
    await browser.executeAsync((done) => {
      setTimeout(done, 10000)
    })
  })

  it("Should display full names on contact list", async () => {
    const contactsTab = await NavigationTabs.contactsTab

    await contactsTab.click()
    await browser.executeAsync((done) => {
      setTimeout(done, 2000)
    })

    const firstContact = await $("p=Adam Nowak")
    const secondContact = await $("p=John Kowalski")

    await expect(firstContact).toBeDisplayed()
    await expect(secondContact).toBeDisplayed()
  })
})
