import NavigationTabs from "../../page-objects/tabs.page"
import NewsPage from "../../page-objects/news.page"

describe("News screen check", () => {
  before(async () => {
    // Waiting for device connected through USB
    await browser.executeAsync((done) => {
      setTimeout(done, 10000)
    })
  })

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
