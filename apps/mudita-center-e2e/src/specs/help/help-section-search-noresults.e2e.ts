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
    await HomePage.clickNotNowButton()
    //Open Help page
    await NavigationTabs.openHelpPage()
  })

  it("Search for not existing article and verify no results information", async () => {
    //Search for not existing article by entering not findable string (special characters)
    await HelpPage.searchForArticle("!@#$%^&*()")


    //Verify quick search: no results information
    const helpSearchResults = await HelpPage.helpSearchResults
    await expect(helpSearchResults).toBeDisplayed()
    const helpSearchResultsParagraph = await HelpPage.helpSearchResultsParagraph
    await expect(helpSearchResultsParagraph).toHaveText("We couldn't find any topics...")
    }
  )
})
