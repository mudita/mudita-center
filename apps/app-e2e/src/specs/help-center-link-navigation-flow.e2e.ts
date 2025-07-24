/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { goToHelpArticleWithTitle } from "../helpers/help-center.helper"
import HelpArticlePage from "../page-objects/help-article.page"
import HelpPage from "../page-objects/help.page"

describe("Help Center - Link Navigation Flow", () => {
  before(async () => {
    await goToHelpArticleWithTitle("Mudita Center does not recognize my device")
  })

  it("should display at least one internal link in the article", async () => {
    const links = await HelpArticlePage.articleInternalLinks
    await expect(links).toBeElementsArrayOfSize({ gte: 1 })
    await expect(links[0]).toHaveText("Update Mudita Center")
    await expect(links[0]).toBeClickable()
  })

  it("should navigate to the linked article when the internal link is clicked", async () => {
    await HelpArticlePage.articleInternalLinks[0].click()
    await expect(HelpArticlePage.articleTitle).toBeDisplayed()
    await expect(HelpArticlePage.articleTitle).toHaveText(
      "How to update Mudita Center"
    )
  })

  it("should navigate back to the original article on back‑button click", async () => {
    await HelpArticlePage.articleBackButton.click()

    await expect(HelpArticlePage.articleTitle).toHaveText(
      "Mudita Center does not recognize my device"
    )
  })

  it("should allow jumping back to the category list when pressing back twice", async () => {
    await HelpArticlePage.articleBackButton.click()
    await expect(HelpPage.subCategoriesListItems).toBeElementsArrayOfSize({
      gte: 1,
    })
    await expect(HelpPage.categoriesListItems[0]).toHaveElementClass("active")
  })
})
