/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { goToHelpCenter } from "../helpers/help-center.helper"
import HelpPage from "../page-objects/help.page"
import HelpArticlePage from "../page-objects/help-article.page"

describe("Help Center - Feedback Flow", () => {
  before(async () => {
    await goToHelpCenter()
    await HelpPage.categoriesListItems[0].click()
    await HelpArticlePage.articleItems[0].click()
  })

  it("should display the feedback section on the article page", async () => {
    await expect(HelpArticlePage.articleFeedback).toBeDisplayed()
    await expect(HelpArticlePage.articleFeedbackTitle).toHaveText(
      "Was this article helpful?"
    )
    await expect(HelpArticlePage.articleFeedbackYesButton).toBeClickable()
    await expect(HelpArticlePage.articleFeedbackNoButton).toBeClickable()
  })

  it("should display thank‑you message after voting YES", async () => {
    await HelpArticlePage.articleFeedbackYesButton.click()
    await expect(HelpArticlePage.feedbackThanksText).toBeDisplayed()
    await expect(HelpArticlePage.feedbackThanksText).toHaveText(
      "Thank you for your opinion!"
    )
  })

  it("should persist thank‑you message on re‑entering the same article", async () => {
    await HelpArticlePage.articleBackButton.click()
    await HelpPage.categoriesListItems[0].click()
    await HelpArticlePage.articleItems[0].click()

    await expect(HelpArticlePage.feedbackThanksText).toBeDisplayed()
    await expect(HelpArticlePage.articleFeedbackYesButton).not.toBeDisplayed()
    await expect(HelpArticlePage.articleFeedbackNoButton).not.toBeDisplayed()
  })

  it("should allow voting NO on a different article and show thank‑you", async () => {
    await HelpArticlePage.articleBackButton.click()
    await HelpArticlePage.articleItems[1].click()

    await HelpArticlePage.articleFeedbackNoButton.click()
    await expect(HelpArticlePage.feedbackThanksText).toBeDisplayed()
    await expect(HelpArticlePage.feedbackThanksText).toHaveText(
      "Thank you for your opinion!"
    )
  })
})
