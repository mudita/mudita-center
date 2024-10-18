/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import NavigationTabs from "../../page-objects/tabs.page"
import HomePage from "../../page-objects/home.page"
import NewsPage from "../../page-objects/news.page"

describe("Check more news button", () => {
  it("Click Not Now and Open Mudita News", async () => {
    const notNowButton = await HomePage.notNowButton
    await expect(notNowButton).toBeClickable()
    await notNowButton.click()
    const muditaNewsTab = NavigationTabs.muditaNewsTab
    await expect(muditaNewsTab).toBeDisplayed()
  })

  it("Check Mudita News Header, check More News button href", async () => {
    const newsHeader = NewsPage.newsHeader
    await expect(newsHeader).toBeDisplayed()
    await expect(newsHeader).toHaveText("Mudita News")

    const moreNewsButton = await NewsPage.moreNewsButton
    await expect(moreNewsButton).toBeDisplayed()

    const moreNewsButtonHref = NewsPage.moreNewsButtonHref
    const checkHref = await moreNewsButtonHref.getAttribute("href")
    await expect(checkHref).toBe("https://www.mudita.com/#news")
  })
})
