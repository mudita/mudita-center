/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import NewsPage from "../../page-objects/news.page"
import { formatMessage } from "app-localize/utils"
import { defaultNews } from "news/main"
import testsHelper from "../../helpers/tests.helper"
import { NewsTestId } from "news/models"

describe("News in offline mode", () => {
  before(async () => {
    await testsHelper.switchToOffline()
  })

  after(async () => {
    await testsHelper.switchToOnline()
  })

  it("(ensure app is in offline mode)", async () => {
    const isOnline = await testsHelper.isOnline()
    await expect(isOnline).toBeFalsy()
  })

  it("have proper menu item active", async () => {
    const activeMenuItem = await NewsPage.activeMenuItem
    await expect(activeMenuItem).toHaveText(
      formatMessage({ id: "page.news.title" })
    )
    await expect(activeMenuItem).toHaveAttribute("href", "#/news")
  })

  it("have proper title in app header", async () => {
    const newsHeader = await NewsPage.appHeader
    await expect(newsHeader).toHaveText(
      formatMessage({ id: "page.news.headerTitle" })
    )
  })

  it("contains 'more news' button with proper link", async () => {
    const moreNewsButton = await NewsPage.moreNewsButton
    await expect(moreNewsButton).toBeDisplayed()
    await expect(moreNewsButton).toBeClickable()
    await expect(moreNewsButton).toHaveText(
      formatMessage({ id: "page.news.headerButton.text" }).toUpperCase()
    )
    await expect(moreNewsButton).toHaveAttribute(
      "href",
      formatMessage({ id: "page.news.headerButton.link" })
    )
  })

  it("contains all news from default file", async () => {
    const newsCardElements = await NewsPage.newsCardElements
    await expect(newsCardElements).toHaveLength(defaultNews.length)
  })

  it("from second line are fully visible after scrolling", async () => {
    const lastNewsCardCommunityLinkText = await NewsPage.newsCardElements[
      defaultNews.length - 1
    ].$(`[data-testid="${NewsTestId.CommunityLink}"] p`)
    await expect(lastNewsCardCommunityLinkText).not.toBeDisplayedInViewport()
    await NewsPage.scrollIntoView(lastNewsCardCommunityLinkText)
    await expect(lastNewsCardCommunityLinkText).toBeDisplayedInViewport()
  })

  it("contains properly formatted news card", async () => {
    const newsCardElements = await NewsPage.newsCardElements

    for (const [index, card] of Array.from(newsCardElements).entries()) {
      // Check image link
      const imageLink = await card.$(`[data-testid="${NewsTestId.ImageLink}"]`)
      await expect(imageLink).toBeClickable()
      await expect(imageLink).toHaveAttribute("href", defaultNews[index].link)

      // Check image
      const image = await card.$(`[data-testid="${NewsTestId.ImageLink}"] img`)
      await expect(image).toBeDisplayed()
      await expect(image).toHaveAttribute("src", defaultNews[index].imageSource)

      // Check title link
      const titleLink = await card.$(`[data-testid="${NewsTestId.HeaderLink}"]`)
      await expect(titleLink).toBeClickable()
      await expect(titleLink).toHaveAttribute("href", defaultNews[index].link)

      // Check title
      const title = await card.$(`[data-testid="${NewsTestId.Title}"]`)
      await expect(title).toBeDisplayed()
      await expect(title).toHaveText(defaultNews[index].title.toUpperCase())

      // Check date
      const date = await card.$(`[data-testid="${NewsTestId.Date}"]`)
      await expect(date).toBeDisplayed()
      await expect(date).toHaveText(
        defaultNews[index].formattedDate.toUpperCase()
      )

      // Check description
      const description = await card.$(
        `[data-testid="${NewsTestId.Description}"]`
      )
      await expect(description).toBeDisplayed()
      await expect(description).toHaveText(defaultNews[index].description)

      // Check community link
      const communityLink = await card.$(
        `[data-testid="${NewsTestId.CommunityLink}"]`
      )
      await expect(communityLink).toBeDisplayed()
      await expect(communityLink).toBeClickable()
      await expect(communityLink).toHaveAttribute(
        "href",
        defaultNews[index].communityLink
      )

      // Check community link text
      const communityLinkText = await card.$(
        `[data-testid="${NewsTestId.CommunityLink}"] p`
      )
      await expect(communityLinkText).toBeDisplayed()
      await expect(communityLinkText).toHaveText(
        formatMessage(
          { id: "page.news.cardCommunityComments" },
          { count: defaultNews[index].commentsCount }
        ).toUpperCase()
      )
    }
  })
})
