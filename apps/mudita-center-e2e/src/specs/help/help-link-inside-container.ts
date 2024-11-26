/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import NavigationTabs from "../../page-objects/tabs.page"
import HelpArticlePage from "../../page-objects/help-article.page"
import HomePage from "../../page-objects/home.page"

describe("Help - Link inside container", () => {
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

  it("Open Pure Category in Help", async () => {
    const pureCategory = HelpArticlePage.helpCategories[1]
    await expect(pureCategory).toBeDisplayed()
    await pureCategory.click()
  })

  it("Open second article, check if there are two containers and click on the link inside first container", async () => {
    const secondArticle = HelpArticlePage.helpArticleItems[1]
    await expect(secondArticle).toBeDisplayed()
    await secondArticle.click()

    //check if there are two containers in the Article
    const contentBlocks = HelpArticlePage.helpArticleContentBlocks
    await expect(contentBlocks).toBeElementsArrayOfSize(2)

    //open link from the first container
    const connectYourDeviceLinkFirst = HelpArticlePage.connectYourDeviceLinks[0]
    await expect(connectYourDeviceLinkFirst).toBeDisplayed()
    await expect(connectYourDeviceLinkFirst).toHaveText("connect your device")
    await connectYourDeviceLinkFirst.click()
  })

  it("Check if user is redirected to article from the link", async () => {
    const helpArticleTitle = HelpArticlePage.helpArticleTitle
    await expect(helpArticleTitle).toBeDisplayed()
    await expect(helpArticleTitle).toHaveText(
      "How to connect Mudita devices to Mudita Center"
    )
  })

  it("Return to the main article", async () => {
    const helpArticleBackButton = await HelpArticlePage.helpArticleBackButton
    await expect(helpArticleBackButton).toBeClickable()
    helpArticleBackButton.click()

    const helpArticleTitle = HelpArticlePage.helpArticleTitle
    await expect(helpArticleTitle).toBeDisplayed()
    await expect(helpArticleTitle).toHaveText("How to delete files from Pure")
  })
})
