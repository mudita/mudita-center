/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import NavigationTabs from "../../page-objects/tabs.page"
import HelpPage from "../../page-objects/help.page"
import HomePage from "../../page-objects/home.page"

describe("Check Help search for no results", () => {
  before(async () => {
    //Click Not Now button
    const notNowButton = await HomePage.notNowButton
    await notNowButton.waitForDisplayed()
    await notNowButton.click()
    //Open Help page
    const helpTab = await NavigationTabs.helpTab
    await helpTab.waitForDisplayed({ timeout: 15000 })
    await helpTab.click()
  })

  it("Search for not existing article and verify no results information", async () => {
    //Search for not existing article by entering not findable string (special characters)
    const helpSearchInput = await HelpPage.helpSearchInput
    await helpSearchInput.setValue("!@#$%^&*()")

    //Verify quick search: no results information
    const helpSearchResults = await HelpPage.helpSearchResults
    await expect(helpSearchResults).toBeDisplayed()
    const iconSearchHelpSearchResults = await HelpPage.iconSearchHelpSearchResults
    await expect(iconSearchHelpSearchResults).toBeDisplayed()
    await expect(helpSearchResults).toHaveText("We couldn't find any topics...")
  })
})
