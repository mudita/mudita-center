import NavigationTabs from "../../page-objects/tabs.page"
import NewsPage from "../../page-objects/news.page"

describe("News screen check", () => {
  it("Should click on 'Mudita News' tab and check news will load", async () => {
    const newsTab = await NavigationTabs.muditaNewsTab
    await newsTab.waitForDisplayed()
    await newsTab.click()

    const singleNews = await NewsPage.newsCardElement
    await expect(singleNews).toBeDisplayed
  })
  it("Should check 'more news' button is displayed", async () => {
    const moreNews = await NewsPage.moreNewsButton
    await expect(moreNews).toBeDisplayed()
  })
})
