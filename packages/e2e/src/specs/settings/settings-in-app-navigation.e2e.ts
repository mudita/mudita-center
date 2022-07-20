import NavigationTabs from "../../page-objects/tabs.page"
import SettingsPage from "../../page-objects/settings.page"

describe("Settings screen check", () => {
  before(async () => {
    // Waiting for device connected through USB
    await browser.executeAsync((done) => {
      setTimeout(done, 10000)
    })
  })
  it("Click on Settings tab and check 'Settings' text label is displayed", async () => {
    const settingsTab = await NavigationTabs.settingsTab
    await settingsTab.click()

    const locationTextLabel = await SettingsPage.locationTextLabel
    const locationTextLabelText = await locationTextLabel.getText()
    await expect(locationTextLabelText).toEqual("Settings")
  })
  it("Should click on 'Backup' tab and check 'Backup Location' path is displayed ", async () => {
    const tabBackup = await SettingsPage.backupTab
    await tabBackup.waitForDisplayed()
    await tabBackup.click()
    const backupLocation = SettingsPage.backupLocationPathTextLabel
    await expect(backupLocation).toBeDisplayed()
  })
  it("Should click on 'About' tab and check installed version text label is displayed ", async () => {
    const tabAbout = await SettingsPage.aboutTab
    await tabAbout.waitForDisplayed()
    await tabAbout.click()
    const installedVersionTextLabel =
      SettingsPage.aboutInstalledVersionTextLabel
    await expect(installedVersionTextLabel).toBeDisplayed()
  })
  it("Should check 'Privacy Policy' text label is displayed ", async () => {
    const privacyPolicyTextLabel = SettingsPage.aboutPrivacyPolicyTextLabel
    await expect(privacyPolicyTextLabel).toBeDisplayed()
  })
  it("Should check 'Licence' text label is displayed ", async () => {
    const licenceTextLabel = SettingsPage.aboutLicenseTextLabel
    await expect(licenceTextLabel).toBeDisplayed()
  })
  it("Should check 'Terms of Service' text label is displayed ", async () => {
    const termsOfServiceTextLabel = SettingsPage.aboutTermsOfServiceTextLabel
    await expect(termsOfServiceTextLabel).toBeDisplayed()
  })
  it("Should click on 'General' tab and check 'Send Mudita Center logs to Mudita' text label is displayed ", async () => {
    const tabGeneral = await SettingsPage.generalTab
    await tabGeneral.click()
    const sendLogsTextLabel = SettingsPage.generalSendLogsTextLabel
    await expect(sendLogsTextLabel).toBeDisplayed()
  })
})
