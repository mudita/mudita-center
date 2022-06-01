import NavigationTabs from "../../page-objects/tabs.page"
import settingsPage from "../../page-objects/settings.page"
import { version } from "../../../../app/package.json"

describe("Navigation Menu check ", () => {

    before(async () => {
      // Waiting for device connected through USB
      await browser.executeAsync((done) => {
        setTimeout(done, 10000)
      })
    })

      it("Check Mudita Center version - app. vs. package.json", async () => {
        
        const appVersionFromJson = version

        const newsTab = await NavigationTabs.settingsTab
        await newsTab.waitForDisplayed()
        await newsTab.click()
        await browser.executeAsync((done) => {
          setTimeout(done, 2000)
        })      

        const tabAbout = await settingsPage.aboutTab
        await tabAbout.waitForDisplayed()
        await tabAbout.click()
        await browser.executeAsync((done) => {
          setTimeout(done, 2000)
        })   
        const appVersionFromAppField = await settingsPage.aboutInstalledVersionTextLabel
        const appVersionFromAppTextValue = await appVersionFromAppField.getText()
        const appVersionFromApp = appVersionFromAppTextValue.split(": ")[1]
        console.log("appVersionFromJson")
        console.log("appVersionFromApp")
        await expect(appVersionFromApp).toEqual(appVersionFromJson)
      })
   

})