import exp from "constants"
import screenshotHelper from "../../helpers/screenshot.helper"
import HomePage from "../../page-objects/home.page"
import NewsPage from "../../page-objects/news.page"
import {
  commentsRegex,
  linkRegex,
  newsDateRegex,
  newsImageRegex,
} from "../../consts/regex-const"

describe("News Page Check", () => {
  it("Opens News Page", async () => {
    const notNowButton = await HomePage.notNowButton
    await expect(notNowButton).toBeClickable()
    notNowButton.click()
    const newsHeader = await NewsPage.newsHeader
    await expect(newsHeader).toHaveText("Mudita News")
  })
  it("Verify Contents of News Page", async () => {
    const moreNewsButton = await NewsPage.moreNewsButton
    await expect(moreNewsButton).toBeDisplayed()

    const newsCardElement = await NewsPage.newsCardElement
    await expect(newsCardElement).toBeDisplayed()

    const sidebarMenuActiveItem = await NewsPage.sidebarMenuActiveItem
    await expect(sidebarMenuActiveItem).toBeClickable()
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
    //Test if comments of second line of news is not visible on screen
    const lastNewsCardCommunityLinkText = await NewsPage.newsCardElements[5].$(
      '[data-testid="community-link"] p[color="primary"]'
    )
    await expect(lastNewsCardCommunityLinkText).not.toBeDisplayedInViewport()
    await lastNewsCardCommunityLinkText.scrollIntoView()
    await expect(lastNewsCardCommunityLinkText).toBeDisplayedInViewport()
  })
  // TODO: to fix
  it.skip("Verify News Cards", async () => {
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
      const newsCardExcerpt = await newsCard.$('[data-testid="content"')
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
})
