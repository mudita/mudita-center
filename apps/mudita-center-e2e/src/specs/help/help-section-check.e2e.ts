/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import NavigationTabs from "../../page-objects/tabs.page"
import HelpPage from "../../page-objects/help.page"
import HomePage from "../../page-objects/home.page"
import { sleep } from "../../helpers/sleep.helper"
import screenshotHelper from "../../helpers/screenshot.helper"

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
    const helpSubCategoriesListItems = await HelpPage.helpSubCategoriesListItems
    await expect(helpSubCategoriesListItems).toBeElementsArrayOfSize({ gte: 1 })

    const helpSubCategoriesListItemsLeftColumn = await HelpPage.helpSubCategoriesListItemsLeftColumn
    await expect(helpSubCategoriesListItemsLeftColumn).toBeElementsArrayOfSize({ gte: 1 })

    //TODO foreach 
    //List of articles should not be empty in any of the categories
    const helpSubCategoryArticlesListItemTitles = await $$('[data-testid="help-subcategories-list-item"]').map((element) => {
       return element.$('[data-testid="help-subcategories-list-item-title"]').getText()
    })
    console.log(helpSubCategoryArticlesListItemTitles)
   


    //TODO erify right column - Troubleshooting
  })
})
