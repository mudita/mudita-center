/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import NavigationTabs from "../../page-objects/tabs.page"
import HelpPage from "../../page-objects/help.page"
import HelpArticlePage from "../../page-objects/help-article.page"
import HomePage from "../../page-objects/home.page"

describe("Check Help - Kompakt Category", () => {
  before(async () => {
    // Click not now button to skip device not recognized screen
    const notNowButton = await HomePage.notNowButton
    await notNowButton.waitForDisplayed()
    await notNowButton.click()
  })

  it("Open Help window", async () => {
    // Add a small delay to ensure all elements are visible
    await browser.pause(500)
    const helpTab = await NavigationTabs.helpTab
    await helpTab.waitForDisplayed({ timeout: 15000 })
    await helpTab.click()
  })

  it("Verify Kompakt Section titles", async () => {
    // Click on the 'Kompakt' category — assuming it's the 3rd one in the list
    const helpCategoriesListItems = await $$(
      '[data-testid="help-categories-list-item"]'
    )
    await helpCategoriesListItems[2].click()

    // Small delay to ensure all elements load
    await browser.pause(500)

    // Verify all items
    const helpSubCategoriesListItems = await $$(
      '[data-testid="help-subcategories-list-item"]'
    )
    await expect(helpSubCategoriesListItems).toBeElementsArrayOfSize({ gte: 1 })

    // Verify left column
    const helpSubCategoriesListItemsLeftColumn = await $$(
      '(//div[@data-testid="help-subcategories-list"]/div)[1]//div[@data-testid="help-subcategories-list-item"]'
    )
    await expect(helpSubCategoriesListItemsLeftColumn).toBeElementsArrayOfSize({
      gte: 1,
    })

    // Verify right column
    const helpSubCategoriesListItemsRightColumn = await $$(
      '(//div[@data-testid="help-subcategories-list"]/div)[2]//div[@data-testid="help-subcategories-list-item"]'
    )
    await expect(helpSubCategoriesListItemsRightColumn).toBeElementsArrayOfSize(
      { gte: 1 }
    )
  })

  it("Check first article", async () => {
    // Add a slightly bigger delay than usual to ensure all elements are visible
    await browser.pause(500)

    const helpArticleItems = HelpArticlePage.helpArticleItems
    await helpArticleItems[0].click()

    //Check back button
    const helpArticleBackButton = await HelpArticlePage.helpArticleBackButton
    await expect(helpArticleBackButton).toBeClickable()

    //Check article title
    const helpArticleTitle = await HelpArticlePage.helpArticleTitle
    await expect(helpArticleTitle).toHaveText("How to change the volume level")

    //Check article content block
    const contentBlocks = await HelpArticlePage.helpArticleContentBlocks

    await expect(contentBlocks).toBeElementsArrayOfSize({ gte: 1 })

    for (const block of contentBlocks) {
      await expect(block).toBeDisplayed()
    }

    //Check article helpful section
    const helpArticleFeedbackYesButton =
      await HelpArticlePage.helpArticleFeedbackYesButton
    await expect(helpArticleFeedbackYesButton).toBeDisplayed()
    await expect(helpArticleFeedbackYesButton).toBeClickable()

    const helpArticleFeedbackNoButton =
      await HelpArticlePage.helpArticleFeedbackNoButton
    await expect(helpArticleFeedbackNoButton).toBeDisplayed()
    await expect(helpArticleFeedbackNoButton).toBeClickable()

    //click back button to return to Kompakt section
    helpArticleBackButton.click()
  })

  it("Check second article", async () => {
    // Add a slightly bigger delay than usual to ensure all elements are visible
    await browser.pause(500)

    const helpArticleItems = HelpArticlePage.helpArticleItems
    await helpArticleItems[1].click()

    //Check article title
    const helpArticleTitle = await HelpArticlePage.helpArticleTitle
    await expect(helpArticleTitle).toHaveText("How to unhide or hide app icons")

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

    //Click back button to return to Kompakt section
    const helpArticleBackButton = await HelpArticlePage.helpArticleBackButton
    helpArticleBackButton.click()
  })

  it("Check last article", async () => {
    //Add a slightly bigger delay than usual to ensure all elements are visible
    await browser.pause(500)

    const helpArticleItems = await HelpArticlePage.helpArticleItems
    await helpArticleItems[helpArticleItems.length - 1].click()

    //Check article title
    const helpArticleTitle = await HelpArticlePage.helpArticleTitle
    await expect(helpArticleTitle).toHaveText(
      "Files don't show when connecting Kompakt via USB-C"
    )

    //Check article helpful section and vote YES
    const helpArticleFeedbackYesButton =
      await HelpArticlePage.helpArticleFeedbackYesButton
    await expect(helpArticleFeedbackYesButton).toBeDisplayed()
    await expect(helpArticleFeedbackYesButton).toBeClickable()
    await helpArticleFeedbackYesButton.click()

    //Verify if "NO" vote was sent
    await expect(helpArticleFeedbackYesButton).not.toBeDisplayed()
    const iconNamaste = HelpArticlePage.iconNamaste
    const feedbackThanksText = HelpArticlePage.feedbackThanksText
    await expect(iconNamaste).toBeDisplayed()
    await expect(feedbackThanksText).toBeDisplayed()
    await expect(feedbackThanksText).toHaveText("Thank you for your opinion!")

    //Click back button to return to Kompakt section
    const helpArticleBackButton = await HelpArticlePage.helpArticleBackButton
    helpArticleBackButton.click()
  })

  it("Verify you are back in active first category", async () => {
    //Add a slightly bigger delay than usual to ensure all elements are visible
    await browser.pause(1000)
    const helpCategoriesListItems = await HelpPage.helpCategoriesListItems

    //Ensure that the helpCategoriesListItems array has at least one element
    await expect(helpCategoriesListItems).toBeElementsArrayOfSize({ gte: 1 })

    //Check if the first category item is displayed
    await expect(helpCategoriesListItems[0]).toBeDisplayed()
  })
})
