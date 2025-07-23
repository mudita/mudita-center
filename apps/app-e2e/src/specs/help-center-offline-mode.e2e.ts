/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AppError, AppResultFactory } from "app-utils/models"
import {
  goToHelpCenter,
  verifyHelpHomeScreenCoreElements,
} from "../helpers/help-center.helper"
import HelpPage from "../page-objects/help.page"
import HelpArticlePage from "../page-objects/help-article.page"

describe("Help Center - Offline Mode", () => {
  before(async () => {
    await goToHelpCenter({
      method: "GET",
      url: "/help-v2",
      response: AppResultFactory.failed(
        new AppError("Help data not available offline")
      ),
    })
  })

  verifyHelpHomeScreenCoreElements()

  it("should list subcategories in two columns offline", async () => {
    await HelpPage.categoriesListItems[1].click()
    const left = await HelpPage.subCategoriesListItemsLeftColumn
    const right = await HelpPage.subCategoriesListItemsRightColumn
    await expect(left).toBeElementsArrayOfSize({ gte: 1 })
    await expect(right).toBeElementsArrayOfSize({ gte: 1 })
  })

  it("should show search results for a valid query offline", async () => {
    await HelpPage.searchInput.setValue("factory reset")
    const items = await HelpPage.searchResultsItems
    await expect(items).toBeElementsArrayOfSize({ gte: 1 })
  })

  it("should open an article from cache offline and display its title", async () => {
    await (await HelpPage.subCategoriesListItems)[0].click()
    await expect(HelpArticlePage.articleTitle).toBeDisplayed()
  })

  it("should navigate back from an article offline and keep the category active", async () => {
    await HelpArticlePage.articleBackButton.click()
    const harmonyTab = HelpPage.categoriesListItems[1]
    await expect(harmonyTab).toHaveElementClass("active")
  })
})
