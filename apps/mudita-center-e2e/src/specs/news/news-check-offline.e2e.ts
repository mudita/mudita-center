import HomePage from "../../page-objects/home.page"
import NewsPage from "../../page-objects/news.page"
import {
  commentsRegex,
  linkRegex,
  newsDateRegex,
  newsImageRegex,
} from "../../consts/regex-const"
import testsHelper from "../../helpers/tests.helper"
import { E2EMockClient } from "../../../../../libs/e2e-mock/client/src"

describe("News Page Check in Offline Mode", () => {
  before(async () => {
    E2EMockClient.connect()
    //wait for a connection to be established
    await browser.waitUntil(() => {
      return E2EMockClient.checkConnection()
    })

    // Clear browser cache
    await browser.deleteAllCookies()
    await browser.execute("window.localStorage.clear();")
    await browser.execute("window.sessionStorage.clear();")

    // Switch to offline mode before starting the tests
    await browser.setNetworkConditions({
      offline: true,
      latency: 0,
      download_throughput: 0,
      upload_throughput: 0,
    })

    // Add a small delay to ensure network conditions are applied
    await browser.pause(1000)

    // Verify network conditions
    const isOnline = await testsHelper.isOnline()
    await expect(isOnline).toBeFalsy()
  })

  it("Opens News Page", async () => {
    const notNowButton = await HomePage.notNowButton
    await expect(notNowButton).toBeClickable()
    await notNowButton.click()

    const newsHeader = await NewsPage.newsHeader
    await expect(newsHeader).toHaveText("Mudita News")
  })

  it("Verify Contents of News Page", async () => {
    const moreNewsButton = await NewsPage.moreNewsButton
    await expect(moreNewsButton).toBeDisplayed()

    const newsCardElement = await NewsPage.newsCardElement
    await expect(newsCardElement).toBeDisplayed()

    const sidebarMenuActiveItem = await NewsPage.sidebarMenuActiveItem
    await expect(sidebarMenuActiveItem).toHaveElementClass("active")
    await expect(sidebarMenuActiveItem).toHaveAttrContaining(
      "displaystyle",
      "7"
    )
    await expect(sidebarMenuActiveItem).toHaveAttr("href", "#/news")

    const sidebarMenuActiveItemText = await NewsPage.sidebarMenuActiveItemText
    await expect(sidebarMenuActiveItemText).toHaveText("Mudita News")
  })

  it("Check content after scroll", async () => {
    // Test if comments of second line of news are not visible on screen
    const lastNewsCardCommunityLinkText = await NewsPage.newsCardElements[5].$(
      '[data-testid="community-link"] p[color="primary"]'
    )
    await expect(lastNewsCardCommunityLinkText).not.toBeDisplayedInViewport()
    await lastNewsCardCommunityLinkText.scrollIntoView()
    await expect(lastNewsCardCommunityLinkText).toBeDisplayedInViewport()
  })

  it("Verify News Cards", async () => {
    const newsCardElements = await NewsPage.newsCardElements
    await expect(newsCardElements).toHaveLength(6)

    for (let newsCard of newsCardElements) {
      const newsCardImageLink = await newsCard.$('[data-testid="image-link"]')
      await expect(newsCardImageLink).toBeClickable()
      await expect(newsCardImageLink).toHaveAttribute("href", linkRegex)

      const newsCardImageSrc = await newsCard.$("img")
      await expect(newsCardImageSrc).toBeDisplayed()
      await expect(newsCardImageSrc).toHaveAttribute("src", newsImageRegex)

      const newsCardTitle = await newsCard.$(
        '[data-testid="header-link"] p[color="primary"]'
      )
      await expect(newsCardTitle).toBeDisplayed()
      await expect(newsCardTitle).toHaveText(/.*/)

      const newsCardDate = await newsCard.$(
        '[data-testid="header-link"] p[color="secondary"]'
      )
      await expect(newsCardDate).toBeDisplayed()
      await expect(newsCardDate).toHaveText(newsDateRegex)

      const newsCardExcerpt = await newsCard.$('[data-testid="content"]')
      await expect(newsCardExcerpt).toBeDisplayed()
      await expect(newsCardExcerpt).toHaveText(/.*/)

      const newsCardCommunityLink = await newsCard.$(
        '[data-testid="community-link"]'
      )
      await expect(newsCardCommunityLink).toBeDisplayed()
      await expect(newsCardCommunityLink).toBeClickable()
      await expect(newsCardCommunityLink).toHaveAttribute("href", linkRegex)

      const newsCardCommunityLinkText = await newsCard.$(
        '[data-testid="community-link"] p[color="primary"]'
      )
      await expect(newsCardCommunityLinkText).toBeDisplayed()
      await expect(newsCardCommunityLinkText).toHaveText(commentsRegex)
    }
  })

  after(async () => {
    E2EMockClient.stopServer()
    E2EMockClient.disconnect()

    // Switch back to online mode after finishing the tests
    await browser.setNetworkConditions({
      offline: false,
      latency: 0,
      download_throughput: -1,
      upload_throughput: -1,
    })

    // Add a small delay to ensure network conditions are applied
    await browser.pause(1000)

    // Verify network conditions
    const isOnline = await testsHelper.isOnline()
    await expect(isOnline).toBeTruthy()
  })
})
