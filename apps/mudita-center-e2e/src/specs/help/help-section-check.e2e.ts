/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import NavigationTabs from "../../page-objects/tabs.page"
import HelpPage from "../../page-objects/help.page"
import HelpArticlePage from "../../page-objects/help-article.page"
import HomePage from "../../page-objects/home.page"

describe("Check Help window", () => {
  before(async () => {
    const notNowButton = await HomePage.notNowButton
    await notNowButton.waitForDisplayed()
    await notNowButton.click()
  })

  it("Open Help window", async () => {
    const helpTab = await NavigationTabs.helpTab
    await helpTab.waitForDisplayed({ timeout: 15000 })
    await helpTab.click()

    //Check window title
    const helpTabTitle = await HelpPage.helpTabTitle
    await helpTabTitle.waitForDisplayed({ timeout: 15000 })
    await expect(helpTabTitle).toHaveText("Mudita Help Center")

    //Verify welcome message
    const helpMainHeader = await HelpPage.helpMainHeader
    await expect(helpMainHeader).toHaveText("Welcome! How can we help you?")

    //Verify welcome paragraph
    const helpMainSubHeader = await HelpPage.helpMainSubHeader
    await expect(helpMainSubHeader).toHaveText("Browse our selection of how-to and troubleshooting guides")

    //Verify search bar
    const iconSearch = await HelpPage.iconSearch
    await expect(iconSearch).toBeDisplayed()

    //Verify search bar icon
    const helpSearchInput = await HelpPage.helpSearchInput
    await expect(helpSearchInput).toBeDisplayed()

    //Verify placeholder
    await expect(helpSearchInput).toHaveAttrContaining("placeholder", "Search topics")
    
    //Verify main section title
    const helpCategoriesTitle = await HelpPage.helpCategoriesTitle
    await expect(helpCategoriesTitle).toHaveText("Which device are you using with Mudita Center?")

    //Section tabs
    const helpCategoriesList = await HelpPage.helpCategoriesList
    await expect(helpCategoriesList).toBeDisplayed()
    const helpCategoriesListItems = await HelpPage.helpCategoriesListItems
    await expect(helpCategoriesListItems).toBeElementsArrayOfSize({ gte: 1 })
    await expect(helpCategoriesListItems).toBeDisplayed()
    
    //Active section tab
    expect(helpCategoriesListItems[0]).toHaveElementClassContaining("active")
    const activeTabColor = await helpCategoriesListItems[0].getCSSProperty("color")
    await expect(activeTabColor.value).toBe("rgba(0,0,0,1)")
    const activeTabBackground = await helpCategoriesListItems[0].getCSSProperty(
      "background-color"
    )
    await expect(activeTabBackground.value).toBe(
      "rgba(237,237,237,1)"
    )

    //Hover on section tabs
    await helpCategoriesListItems[1].moveTo()
    const hoverTabColor = await helpCategoriesListItems[0].getCSSProperty("color")
    await expect(hoverTabColor.value).toBe("rgba(0,0,0,1)")
    const hoverTabBackground = await helpCategoriesListItems[0].getCSSProperty(
      "background-color"
    )
    await expect(hoverTabBackground.value).toBe(
      "rgba(237,237,237,1)"
    )
  })

  it("Verify Harmony Section titles", async () => {

    //Verify all items
    const helpSubCategoriesListItems = await HelpPage.helpSubCategoriesListItems
    await expect(helpSubCategoriesListItems).toBeElementsArrayOfSize({ gte: 1 })

    //Verify left column
    const helpSubCategoriesListItemsLeftColumn = await HelpPage.helpSubCategoriesListItemsLeftColumn
    await expect(helpSubCategoriesListItemsLeftColumn).toBeElementsArrayOfSize({ gte: 1 })

    //Verify right column
    const helpSubCategoriesListItemsRightColumn = await HelpPage.helpSubCategoriesListItemsRightColumn
    await expect(helpSubCategoriesListItemsRightColumn).toBeElementsArrayOfSize({ gte: 1 })

    //Every sub category should not be empty
    const helpSubCategoryArticlesListItemTitles = await helpSubCategoriesListItems.map((element) => {
       return element.$('[data-testid="help-subcategories-list-item-title"]').getText()
    })
    await expect(helpSubCategoryArticlesListItemTitles.length).toBeGreaterThanOrEqual(1)

    //List of articles should not be empty in any of the categories
    //TODO TypeError: Cannot read properties of undefined (reading '$$')
    //TODO move selector to page object? 
    await expect(helpSubCategoriesListItems[0].$$('[data-testid="help-subcategory-articles-list-item"]')).toBeElementsArrayOfSize({ gte: 1 })
    await expect(helpSubCategoriesListItems[1].$$('[data-testid="help-subcategory-articles-list-item"]')).toBeElementsArrayOfSize({ gte: 1 })
    await expect(helpSubCategoriesListItems[2].$$('[data-testid="help-subcategory-articles-list-item"]')).toBeElementsArrayOfSize({ gte: 1 })
    // for (let i = 0; i <= helpSubCategoriesListItems.length; i++) {
    //   await expect(helpSubCategoriesListItems[i].$$('[data-testid="help-subcategory-articles-list-item"]')).toBeElementsArrayOfSize({ gte: 1 })
    // }
  })
  it("Search for questions and verify results", async () => {
    const helpSearchInput = await HelpPage.helpSearchInput
    helpSearchInput.setValue("How to do factory reset on Pure")

    //Verify quick search results
    const helpSearchResults = await HelpPage.helpSearchResults
    await expect(helpSearchResults).toBeDisplayed()
    const helpSearchResultsParagraph = await HelpPage.helpSearchResultsParagraph
    await expect(helpSearchResultsParagraph).toBeDisplayed()
    await expect(helpSearchResultsParagraph).toHaveText("Quick Links")
    //List should not be empty, bigger than 1
    const helpSearchResultsItems = await HelpPage.helpSearchResultsItems
    await expect(helpSearchResultsItems).toBeElementsArrayOfSize({ gte: 1 })
    //Click first article
    helpSearchResultsItems[0].click()
  })
  it("Check first article", async () => {
    //Check window title
    const helpTabTitle = await HelpPage.helpTabTitle
    await helpTabTitle.waitForDisplayed({ timeout: 15000 })
    await expect(helpTabTitle).toHaveText("Mudita Help Center")

    //Check back button
    const helpArticleBackButton = await HelpArticlePage.helpArticleBackButton
    await expect(helpArticleBackButton).toBeClickable()

    //Check article title
    const helpArticleTitle = await HelpArticlePage.helpArticleTitle
    await expect(helpArticleTitle).toHaveText("How to do factory reset on Pure")

    //Check article warning 
    const helpArticleWarningIcon = await HelpArticlePage.helpArticleWarningIcon
    await expect(helpArticleWarningIcon).toBeDisplayed()

    const helpArticleWarning = await HelpArticlePage.helpArticleWarning
    await expect(helpArticleWarning).toHaveTextContaining("This will delete everything on your phone!")

    //Check article content
    const helpArticleContent = await HelpArticlePage.helpArticleContent
    await expect(helpArticleContent).toBeDisplayed() 
    const helpArticleContentBlocks = await HelpArticlePage.helpArticleContentBlocks
    await expect(helpArticleContentBlocks).toBeElementsArrayOfSize({ gte: 2 })
    await expect(HelpArticlePage.getHelpArticleContentBlockTitle(0)).toHaveTextContaining("If your Pure is locked:")
    await expect(HelpArticlePage.getHelpArticleContentBlockText(0)).toHaveTextContaining("Turn off your Pure, hold down the right selection key > select Yes")
  
    //Check article helpful section
    const helpArticleFeedbackYesButton = await HelpArticlePage.helpArticleFeedbackYesButton
    await expect(helpArticleFeedbackYesButton).toBeDisplayed()
    await expect(helpArticleFeedbackYesButton).toBeClickable()

    const helpArticleFeedbackNoButton = await HelpArticlePage.helpArticleFeedbackNoButton
    await expect(helpArticleFeedbackNoButton).toBeDisplayed()
    await expect(helpArticleFeedbackNoButton).toBeClickable()

    const helpArticleFooter = await HelpArticlePage.helpArticleFooter
    await helpArticleFooter.scrollIntoView()

    const helpArticleFooterTitle = await HelpArticlePage.helpArticleFooterTitle
    await expect(helpArticleFooterTitle).toHaveText("Need more help?\nVisit our Support Website")
    
    const helpArticleFooterVisitSupportButton = await HelpArticlePage.helpArticleFooterVisitSupportButton
    await expect(helpArticleFooterVisitSupportButton).toHaveText("VISIT SUPPORT WEBSITE")

    helpArticleBackButton.click()
  })
  it("Verify you are back in active first category", async () => {
    const helpCategoriesListItems = await HelpPage.helpCategoriesListItems
    await expect(helpCategoriesListItems).toBeElementsArrayOfSize({ gte: 1 })
    await expect(helpCategoriesListItems).toBeDisplayed()
    
    //Active section tab
    expect(helpCategoriesListItems[0]).toHaveElementClassContaining("active")
  })
})
