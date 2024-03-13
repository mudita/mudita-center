/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import NavigationTabs from "../../page-objects/tabs.page"
import HelpPage from "../../page-objects/help.page"
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

    await browser.switchWindow("#/help")
  })

  it("Check contents of Mudita Help", async () => {
    // Check window title
    const helpTitle = await HelpPage.windowTitle
    await helpTitle.waitForDisplayed({ timeout: 15000 })
    await expect(helpTitle).toBeDisplayed()
    await expect(helpTitle).toHaveText("Mudita Center Help")

    // Check presence of the search engine
    const searchIcon = await HelpPage.searchIcon
    await searchIcon.waitForDisplayed()
    await expect(searchIcon).toBeDisplayed()

    const searchPlaceholder = await HelpPage.searchPlaceholder
    console.log(searchPlaceholder)
    await expect(searchPlaceholder).toHaveAttributeContaining("placeholder", "Search")

    // Check Contact support button
    const contactSupportButton = await HelpPage.contactSupportButton
    await contactSupportButton.waitForDisplayed()
    await expect(contactSupportButton).toBeDisplayed()
    await expect(contactSupportButton).toBeClickable()

    const contactSupportTooltip = await HelpPage.contactSupportButtonTooltip
    contactSupportButton.moveTo()
    await expect(contactSupportTooltip).toBeDisplayed()
    await expect(contactSupportTooltip).toHaveText("Contact support")

    // Check presence of the list element
    const helpTopic = await HelpPage.listElement
    await helpTopic.waitForDisplayed()
    await expect(helpTopic).toBeDisplayed()
  })

  it("Check content of first article", async () => {
    const helpTopic = await HelpPage.listElement
    await expect(helpTopic).toHaveText("How to import my iCloud contacts into Mudita Pure by using .vcf file?")
    await helpTopic.click()
    const helpTopicContent = await HelpPage.topicContent
    await expect(helpTopicContent).toBeDisplayed()
    await expect(helpTopicContent).toHaveTextContaining('Click on the “Import” button.')
    const backLink = await HelpPage.articleBackLink
    await backLink.click()
    const helpTitle = await HelpPage.windowTitle
    await expect(helpTitle).toHaveText("Mudita Center Help")
  })
})
