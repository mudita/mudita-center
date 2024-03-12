import HomePage from "../../page-objects/home.page"

// npx wdio run wdio.conf.ts --spec ./src/specs/overview/home-page.e2e.ts
describe("Home Screen Page", () => {
    before(async () => {
        // Waiting for device connected through USB
        await browser.executeAsync((done) => {
            setTimeout(done, 10000)
        })
    })
    it("Opens Home Page", async () => {
        const welcomeHeader = await HomePage.homeHeader
        await expect(welcomeHeader).toBeDisplayed()
        await expect(welcomeHeader).toHaveText('Welcome to Mudita Center');
    })

})