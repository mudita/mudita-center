/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import NavigationTabs from "../../page-objects/tabs.page"
import HelpPage from "../../page-objects/help.page"
import HomePage from "../../page-objects/home.page"
import HelpModalPage from "../../page-objects/help-modal.page"
import NewsPage from "../../page-objects/news.page"

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
    await expect(searchPlaceholder).toHaveAttributeContaining("placeholder", "Search")

    // Check presence of Contact support button
    const contactSupportButton = await HelpPage.contactSupportButton
    await contactSupportButton.waitForDisplayed()
    await expect(contactSupportButton).toBeDisplayed()
    await expect(contactSupportButton).toBeClickable()

    const contactSupportTooltip = await HelpPage.contactSupportButtonTooltip
    contactSupportButton.moveTo()
    await expect(contactSupportTooltip).toBeDisplayed()
    await expect(contactSupportTooltip).toHaveText("Contact support")

    // Check accordion
    const helpTopic = await HelpPage.listElement
    await helpTopic.waitForDisplayed()
    await expect(helpTopic).toBeDisplayed()
    const noOfArticles = await $$('[data-testid="help-component-question"]').length
    await expect(noOfArticles).toEqual(25)
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

  it("Search for questions & check search results", async () => {
    const searchPlaceholder = await HelpPage.searchPlaceholder
    searchPlaceholder.setValue("fail")
    browser.keys("\uE007")
    const helpTopic = await HelpPage.listElement
    await expect(helpTopic).toHaveText("OS update failed")
    searchPlaceholder.setValue("harMony")
    browser.keys("\uE007")
    const helpTopic = await HelpPage.listElement
    await expect(helpTopic).toHaveText("How to connect my Mudita Harmony to Center?")
    const noOfArticles = await $$('[data-testid="help-component-question"]').length
    await expect(noOfArticles).toEqual(4)
  })

  it("Check Contact support modal", async () => {
    const contactSupportButton = await HelpPage.contactSupportButton
    await contactSupportButton.click()
    const modalHeader = await HelpModalPage.modalHeader
    await expect(modalHeader).toBeDisplayed
    const closeButton = await HelpModalPage.closeModalButton
    await closeButton.click()

    await browser.switchWindow("#/news")
    const newsHeader = await NewsPage.newsHeader
    await expect(newsHeader).toBeDisplayed
    await expect(newsHeader).toHaveText("Mudita News")
  })
})
