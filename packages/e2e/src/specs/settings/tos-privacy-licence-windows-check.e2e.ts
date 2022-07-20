import NavigationTabs from "../../page-objects/tabs.page"
import SettingsPage from "../../page-objects/settings.page"

describe("Check new windows display - Terms of Service, Privacy Policy, License", () => {
  before(async () => {
    // Waiting for device connected through USB
    await browser.executeAsync((done) => {
      setTimeout(done, 10000)
    })
  })
  it("Navigates to About tab in Settings, clicks TOS button and checks wrapper component is displayed", async () => {
    await browser.executeAsync((done) => {
      setTimeout(done, 10000)
    })
    const settingsTab = await NavigationTabs.settingsTab
    settingsTab.waitForDisplayed({ timeout: 15000 })
    await settingsTab.click()

    const tabAbout = await SettingsPage.aboutTab

    await tabAbout.click()

    const tosLink = await SettingsPage.aboutTermsOfServiceButton
    await tosLink.click()
    await browser.pause(2000)
    await browser.switchWindow("#/terms-of-service")

    const toswrapper = await SettingsPage.aboutTermsOfServiceComponentWrapper
    await toswrapper.waitForDisplayed({ timeout: 15000 })
    await expect(toswrapper).toBeDisplayed
    await browser.switchWindow("#/overview")
  })
  it("Clicks Privacy Policy button and checks wrapper component is displayed in new window", async () => {
    await browser.switchWindow("#/overview")

    const privacyLink = await SettingsPage.aboutPrivacyPolicyButton
    await privacyLink.click()
    await browser.pause(2000)
    await browser.switchWindow("#/privacy-policy")

    const privacyWrapper = await SettingsPage.aboutPrivacyPolicyComponentWrapper
    await privacyWrapper.waitForDisplayed({ timeout: 15000 })
    await expect(privacyWrapper).toBeDisplayed
  })
  it("Clicks Licence button and check wrapper component is displayed in new window", async () => {
    await browser.switchWindow("#/overview")

    const licenseLink = await SettingsPage.aboutLicenseButton
    await licenseLink.click()
    await browser.pause(2000)
    await browser.switchWindow("#/license")

    const licenseWrapper = await SettingsPage.aboutLicenseComponentWrapper
    await licenseWrapper.waitForDisplayed({ timeout: 15000 })
    await expect(licenseWrapper).toBeDisplayed
  })
})
