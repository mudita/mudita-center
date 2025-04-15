/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import "types-preload"
import NewsPage from "../../page-objects/news.page"
import { formatMessage } from "app-localize/utils"
import { NewsTestId } from "news/models"
import {
  linkRegex,
  newsDateRegex,
  newsImageRegex,
  nonEmptyTextRegex,
} from "../../consts/regex-const"

describe("News screen", () => {
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

  it("have fully visible second line after scrolling", async () => {
    const newsCardElements = await NewsPage.newsCardElements
    const lastNewsCardCommunityLinkText = await newsCardElements[
      newsCardElements.length - 1
    ].$(`[data-testid="${NewsTestId.CommunityLink}"] p`)
    await expect(lastNewsCardCommunityLinkText).not.toBeDisplayedInViewport()
    await NewsPage.scrollIntoView(lastNewsCardCommunityLinkText)
    await expect(lastNewsCardCommunityLinkText).toBeDisplayedInViewport()
  })

  it("contains properly formatted news card", async () => {
    const newsCardElements = await NewsPage.newsCardElements

    for (const card of newsCardElements) {
      // Check image link
      const imageLink = await card.$(`[data-testid="${NewsTestId.ImageLink}"]`)
      await expect(imageLink).toBeClickable()
      await expect(imageLink).toHaveAttribute("href", linkRegex)

      // Check image
      const image = await card.$(`[data-testid="${NewsTestId.ImageLink}"] img`)
      await expect(image).toBeDisplayed()
      await expect(image).toHaveAttribute("src", newsImageRegex)

      // Check title link
      const titleLink = await card.$(`[data-testid="${NewsTestId.HeaderLink}"]`)
      await expect(titleLink).toBeClickable()
      await expect(titleLink).toHaveAttribute("href", linkRegex)

      // Check title
      const title = await card.$(`[data-testid="${NewsTestId.Title}"]`)
      await expect(title).toBeDisplayed()
      await expect(title).toHaveText(nonEmptyTextRegex)

      // Check date
      const date = await card.$(`[data-testid="${NewsTestId.Date}"]`)
      await expect(date).toBeDisplayed()
      await expect(date).toHaveText(newsDateRegex)

      // Check description
      const description = await card.$(
        `[data-testid="${NewsTestId.Description}"]`
      )
      await expect(description).toBeDisplayed()
      await expect(description).toHaveText(nonEmptyTextRegex)

      // Check community link
      const communityLink = await card.$(
        `[data-testid="${NewsTestId.CommunityLink}"]`
      )
      await expect(communityLink).toBeDisplayed()
      await expect(communityLink).toBeClickable()
      await expect(communityLink).toHaveAttribute("href", linkRegex)

      // Check community link text
      const commentsCount = await card.$(
        `[data-testid="${NewsTestId.CommunityLink}"] p`
      )
      const commentsCountText = await commentsCount.getText()
      const commentsCountRegex = commentsCountText.match(
        /(\d+)(\s)(COMMENTS|COMMENT)$/
      )
      const commentsCountValue = commentsCountRegex?.[1] || 0
      const communityLinkText = await card.$(
        `[data-testid="${NewsTestId.CommunityLink}"] p`
      )
      await expect(communityLinkText).toBeDisplayed()
      await expect(communityLinkText).toHaveText(
        formatMessage(
          { id: "page.news.cardCommunityComments" },
          { count: commentsCountValue }
        ).toUpperCase()
      )
    }
  })
})
