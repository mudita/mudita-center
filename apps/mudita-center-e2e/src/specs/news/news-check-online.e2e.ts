import screenshotHelper from "../../helpers/screenshot.helper"
import HomePage from "../../page-objects/home.page"
import NewsPage from "../../page-objects/news.page"

describe("News Page", () => {
  it("Opens News Page", async () => {
    const notNowButton = await HomePage.notNowButton
    await expect(notNowButton).toBeClickable()
    notNowButton.click()
    const newsHeader = await NewsPage.newsHeader
    await expect(newsHeader).toHaveText("Mudita News")
  })
  it("Verify Contents of News Page", async () => {
    const moreNewsButton = await NewsPage.moreNewsButton
    const newsCardElement = await NewsPage.newsCardElement
    await expect(moreNewsButton).toBeDisplayed()
    await expect(newsCardElement).toBeDisplayed()

    const sidebarMenuActiveItem = await NewsPage.sidebarMenuActiveItem
    await expect(sidebarMenuActiveItem).toBeClickable()
    screenshotHelper.makeViewScreenshot()
    await expect(sidebarMenuActiveItem).toHaveElementClass("active")
    await expect(sidebarMenuActiveItem).toHaveAttrContaining(
      "displaystyle",
      "7"
    )
    await expect(sidebarMenuActiveItem).toHaveAttr("href", "#/news")
    const sidebarMenuActiveItemText = await NewsPage.sidebarMenuActiveItemText
    await expect(sidebarMenuActiveItemText).toHaveText("Mudita News")

    const newsCardList = await NewsPage.newsCardList
    await expect(newsCardList).toHaveLength(6)
    const newsCardImage = await NewsPage.newsCardImage
    await expect(newsCardImage).toBeDisplayed()
    await expect(newsCardImage).toBeClickable()
    const regex = /(^https?:\/\/forum.mudita.com\/t).*$/
    await expect(newsCardImage).toHaveAttribute("href", regex)
  })
})
