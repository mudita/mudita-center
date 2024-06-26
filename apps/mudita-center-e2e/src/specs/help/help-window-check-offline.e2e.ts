/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import NavigationTabs from "../../page-objects/tabs.page"
import HelpPage from "../../page-objects/help.page"
import HomePage from "../../page-objects/home.page"
import HelpModalPage from "../../page-objects/help-modal.page"
import NewsPage from "../../page-objects/news.page"
import dns from "node:dns"

describe("Check Help window in offline mode", () => {
  before(async function () {
    dns.setDefaultResultOrder("ipv4first")
    await browser.throttle("offline")

    const notNowButton = await HomePage.notNowButton
    await notNowButton.waitForDisplayed()
    await notNowButton.click()
  })

  it("Open Help window", async () => {
    const helpTab = await NavigationTabs.helpTab
    await helpTab.waitForDisplayed({ timeout: 15000 })
    await helpTab.click()

    await browser.switchWindow("#/help")

    // Check window title
    const helpTitle = await HelpPage.windowTitle
    await helpTitle.waitForDisplayed({ timeout: 15000 })
    await expect(helpTitle).toHaveText("Mudita Center Help")
  })

  it("Check contents of Mudita Help", async () => {
    // Check presence of the search engine
    const searchIcon = await HelpPage.searchIcon
    await expect(searchIcon).toBeDisplayed()

    const searchPlaceholder = await HelpPage.searchPlaceholder
    await expect(searchPlaceholder).toHaveAttributeContaining(
      "placeholder",
      "Search"
    )

    // Check presence of Contact support button
    const contactSupportButton = await HelpPage.contactSupportButton
    await expect(contactSupportButton).toBeDisplayed()
    await expect(contactSupportButton).toBeClickable()

    const contactSupportButtonTooltip =
      await HelpPage.contactSupportButtonTooltip
    contactSupportButton.moveTo()
    await expect(contactSupportButtonTooltip).toBeDisplayed()
    await expect(contactSupportButtonTooltip).toHaveText("Contact support")

    // Check accordion
    const helpTopic = await HelpPage.listElement

    await expect(helpTopic).toBeDisplayed()
    const noOfArticles = await HelpPage.listElements
    await expect(noOfArticles).toBeElementsArrayOfSize({ gte: 25 })
  })

  it("Check content of first article", async () => {
    const helpTopic = await HelpPage.listElement
    await expect(helpTopic).toHaveText(
      "How to import my iCloud contacts into Mudita Pure by using .vcf file?"
    )
    await helpTopic.click()
    const helpTopicContent = await HelpPage.topicContent
    await expect(helpTopicContent).toBeDisplayed()
    await expect(helpTopicContent).toHaveTextContaining(
      "Click on the “Import” button."
    )
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
    await helpTopic.waitForDisplayed({ timeout: 15000 })
    await expect(helpTopic).toHaveText(
      "How to connect my Mudita Harmony to Center?"
    )
    const noOfArticles = await HelpPage.listElements
    await expect(noOfArticles).toBeElementsArrayOfSize({ gte: 4 })
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
