/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import NavigationTabs from "../../page-objects/tabs.page"
import HelpPage from "../../page-objects/help.page"
import HomePage from "../../page-objects/home.page"
import { sleep } from "../../helpers/sleep.helper"

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

    // Check window title
    const helpTabTitle = await HelpPage.helpTabTitle
    await helpTabTitle.waitForDisplayed({ timeout: 15000 })
    await expect(helpTabTitle).toHaveText("Mudita Help Center")

    // Verify welcome message
    const helpMainHeader = await HelpPage.helpMainHeader
    await expect(helpMainHeader).toHaveText("Welcome! How can we help you?")

    // TODO Verify welcome paragraph
    const helpMainSubHeader = await HelpPage.helpMainSubHeader
    await expect(helpMainSubHeader).toHaveText("Browse our selection of how-to and troubleshooting guides")

    // TODO Verify search bar
    const iconSearch = await HelpPage.iconSearch
    await expect(iconSearch).toBeDisplayed()

    // TODO verify search bar icon
    const helpSearchInput = await HelpPage.helpSearchInput
    await expect(helpSearchInput).toBeDisplayed()

    //TODO verify placeholder
    await expect(helpSearchInput).toHaveAttrContaining("placeholder", "Search topics")
    
    //TODO verify main section title
    const helpCategoriesTitle = await HelpPage.helpCategoriesTitle
    await expect(helpCategoriesTitle).toHaveText("Which device are you using with Mudita Center?")

    //TODO section tabs
    const helpCategoriesList = await HelpPage.helpCategoriesList
    await expect(helpCategoriesList).toBeDisplayed()
    const helpCategoriesListItems = await HelpPage.helpCategoriesListItems
    await expect(helpCategoriesListItems).toBeElementsArrayOfSize({ gte: 1 })
    await expect(helpCategoriesListItems).toBeDisplayed()
    
    //TODOActive section tabs
    expect(helpCategoriesListItems[0]).toHaveElementClassContaining("active")


    //TODO Hover on section tabs
  })

})
