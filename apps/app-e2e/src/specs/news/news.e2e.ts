/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import NewsPage from "../../page-objects/news.page"
import Page from "../../page-objects/page"
import { formatMessage } from "app-localize/utils"
import { defaultNews } from "news/main"

describe("News in offline mode", () => {
  before(async () => {
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

    const isOnline = await browser.execute(() => navigator.onLine)
    await expect(isOnline).toBeFalsy()
  })

  it("have proper title in app header", async () => {
    const newsHeader = await Page.appHeader
    await expect(newsHeader).toHaveText(
      formatMessage({ id: "page.news.headerTitle" })
    )
  })

  it("contains 'more news' button with proper link", async () => {
    const moreNewsButton = await NewsPage.moreNewsButton
    await expect(moreNewsButton).toBeDisplayed()
    await expect(moreNewsButton).toHaveAttribute(
      "href",
      "https://mudita.com/pl/community/blog/"
    )
  })

  it("contains news cards", async () => {
    const newsCardElements = await NewsPage.newsCardElements
    // await expect(newsCardElements).toBeDisplayed()
    await expect(newsCardElements).toHaveLength(defaultNews.newsItems.length)

    // for (let i = 0; i < await newsCardElements.length; i++) {
    //   await expect(newsCardElements[i]).toBeDisplayed()
    //   await expect(newsCardElements[i]).toHaveAttributeContaining(
    //     "data-testid",
    //     "news-card"
    //   )
    // }
  })
})
