/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { goToHelpCenter } from "../helpers/help-center.helper"
import HelpPage from "../page-objects/help.page"
import HelpArticlePage from "../page-objects/help-article.page"

describe("Help Center - Search Functionality", () => {
  before(async () => {
    await goToHelpCenter()
  })

  it("should display the search input on the Help home screen", async () => {
    await expect(HelpPage.searchInput).toBeDisplayed()
    await expect(HelpPage.searchInput).toBeEnabled()
  })

  it("should hide the results container before any search is performed", async () => {
    await expect(HelpPage.searchResults).not.toBeDisplayed()
  })

  it("should display the correct placeholder text", async () => {
    await expect(HelpPage.searchInputWrapper).toHaveText("Search topics")
  })

  it("should display the search results container when a valid query is entered", async () => {
    await HelpPage.searchInput.setValue("How to do factory reset on Pure")
    await expect(HelpPage.searchResults).toBeDisplayed()
  })

  it('should display a "Quick Links" header above the results', async () => {
    await expect(HelpPage.searchResultsParagraph).toHaveText("Quick Links")
  })

  it("should list at least one clickable search result item", async () => {
    const items = await HelpPage.searchResultsItems
    await expect(items).toBeElementsArrayOfSize({ gte: 1 })
    await expect(items[0]).toBeClickable()
  })

  it("should navigate to the correct article when a result is clicked", async () => {
    await HelpPage.searchResultsItems[0].click()
    await expect(HelpArticlePage.articleTitle).toBeDisplayed()
    await expect(HelpArticlePage.articleTitle).toHaveText(
      "How to do factory reset on Pure"
    )
    await HelpArticlePage.articleBackButton.click()
  })

  it("should display a no‑results message when no topics match", async () => {
    await HelpPage.searchInput.setValue("!@#$%^&*")
    await expect(HelpPage.searchResults).toBeDisplayed()
    await expect(HelpPage.searchResultsParagraph).toHaveText(
      "We couldn't find any topics..."
    )
  })

  it("should hide the search results when the query is manually cleared", async () => {
    await HelpPage.searchInput.clearValue()
    await expect(HelpPage.searchResults).not.toBeDisplayed()
    await expect(HelpPage.searchInputIconClose).not.toBeDisplayed()
  })

  // TODO: Un skip this test when the clear icon functionality is fixed
  it.skip("should clear the results container when the query is cleared via the clear‑icon", async () => {
    await HelpPage.searchInput.setValue("How to do factory reset on Pure")
    await expect(HelpPage.searchResults).toBeDisplayed()
    await expect(HelpPage.searchInputIconClose).toBeDisplayed()
    await HelpPage.searchInputIconClose.click()
    await expect(HelpPage.searchResults).not.toBeDisplayed()
    await expect(HelpPage.searchInputIconClose).not.toBeDisplayed()
  })
})
