/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import NavigationTabs from "../../page-objects/tabs.page"
import HelpArticlePage from "../../page-objects/help-article.page"
import HomePage from "../../page-objects/home.page"

describe("Help - Verify Feedback", () => {
  before(async () => {
    const notNowButton = await HomePage.notNowButton
    await notNowButton.waitForDisplayed()
    await notNowButton.click()
  })

  it("Open Help window", async () => {
    const helpTab = await NavigationTabs.helpTab
    await helpTab.waitForDisplayed({ timeout: 15000 })
    await helpTab.click()
  })

  it("Check first article and give feedback as YES", async () => {
    const firstArticle = HelpArticlePage.helpArticleItems[0]
    await expect(firstArticle).toBeDisplayed()
    await firstArticle.click()

    //Check article title
    const helpArticleTitle = await HelpArticlePage.helpArticleTitle
    await expect(helpArticleTitle).toHaveText(
      "How to add music files to Harmony"
    )

    //Check article helpful section and vote YES
    const helpArticleFeedbackYesButton =
      await HelpArticlePage.helpArticleFeedbackYesButton
    await expect(helpArticleFeedbackYesButton).toBeDisplayed()
    await expect(helpArticleFeedbackYesButton).toBeClickable()
    await helpArticleFeedbackYesButton.click()

    //Verify if "YES" vote was sent
    await expect(helpArticleFeedbackYesButton).not.toBeDisplayed()
    const iconNamaste = HelpArticlePage.iconNamaste
    const feedbackThanksText = HelpArticlePage.feedbackThanksText
    await expect(iconNamaste).toBeDisplayed()
    await expect(feedbackThanksText).toBeDisplayed()
    await expect(feedbackThanksText).toHaveText("Thank you for your opinion!")

    //Check back button and return from article
    const helpArticleBackButton = await HelpArticlePage.helpArticleBackButton
    await expect(helpArticleBackButton).toBeClickable()
    helpArticleBackButton.click()
  })

  it("Check second article and give feedback as NO", async () => {
    const secondArticle = HelpArticlePage.helpArticleItems[1]
    await expect(secondArticle).toBeDisplayed()
    await secondArticle.click()

    //Check article title
    const helpArticleTitle = await HelpArticlePage.helpArticleTitle
    await expect(helpArticleTitle).toHaveText(
      "How to delete music files from Harmony"
    )

    //Check article helpful section and vote NO
    const helpArticleFeedbackNoButton =
      await HelpArticlePage.helpArticleFeedbackNoButton
    await expect(helpArticleFeedbackNoButton).toBeDisplayed()
    await expect(helpArticleFeedbackNoButton).toBeClickable()
    await helpArticleFeedbackNoButton.click()

    //Verify if "NO" vote was sent
    await expect(helpArticleFeedbackNoButton).not.toBeDisplayed()
    const iconNamaste = HelpArticlePage.iconNamaste
    const feedbackThanksText = HelpArticlePage.feedbackThanksText
    await expect(iconNamaste).toBeDisplayed()
    await expect(feedbackThanksText).toBeDisplayed()
    await expect(feedbackThanksText).toHaveText("Thank you for your opinion!")
  })
})
