import NavigationTabs from "../page-objects/tabs.page"
import NewsPage from "../page-objects/news.page"
import OverviewPage from "../page-objects/overview.page"
import MessagesPage from "../page-objects/messages.page"
import ContactsPage from "../page-objects/contacts.page"
import SettingsPage from "../page-objects/settings.page"

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
    await browser.executeAsync((done) => {
      setTimeout(done, 8000)
    })
    const singleNews = await NewsPage.newsCardElement
    await expect(singleNews).toBeDisplayed
  })
  it("Should check 'more news' button is displayed", async () => {
    const moreNews = await NewsPage.moreNewsButton
    await expect(moreNews).toBeDisplayed()
  })
})

describe("Contacts screen check", () => {
  before(async () => {
    // Waiting for device connected through USB
    await browser.executeAsync((done) => {
      setTimeout(done, 5000)
    })
  })
  it("Should click Contacts tab and check Import button is displayed", async () => {
    const contactsTab = await NavigationTabs.contactsTab
    //await contactsTab.waitForDisplayed()
    await contactsTab.click()
    await browser.executeAsync((done) => {
      setTimeout(done, 2000)
    })
    const importBtn = await ContactsPage.importButton
    await expect(importBtn).toBeDisplayed()
  })
  it("Should click 'new contact' button and check it will become disabled", async () => {
    const newContactBtn = await ContactsPage.newContactButton
    await expect(newContactBtn).toBeDisplayed()
    await newContactBtn.click()
    await expect(newContactBtn).toBeDisabled()
  })
  it("Should check 'first name' input field is displayed", async () => {
    const firstName = await ContactsPage.firstNameInput

    await expect(firstName).toBeDisplayed()
  })

  it("Should check if 'last name' input field is displayed", async () => {
    const lastName = await ContactsPage.lastNameInput
    await expect(lastName).toBeDisplayed()
  })

  it("Should check if 'phone number' input field is displayed", async () => {
    const phoneNumber = await ContactsPage.phoneNumberInput
    await expect(phoneNumber).toBeDisplayed()
  })

  it("Should check if 'second phone number' input field is displayed", async () => {
    const phoneNumber2 = await ContactsPage.secondPhoneNumberInput
    await expect(phoneNumber2).toBeDisplayed()
  })

  it("Should check if 'address1' input field is displayed", async () => {
    const address1 = await ContactsPage.addressLine1Input
    await expect(address1).toBeDisplayed()
  })

  it("Should check if 'address2' input field is displayed", async () => {
    const address2 = await ContactsPage.addressLine2Input
    await expect(address2).toBeDisplayed()
  })

  it("Should check if 'add to favourites' checkbox field is displayed", async () => {
    const addFavourites = await ContactsPage.addToFavouritessCheckbox
    await expect(addFavourites).toBeDisplayed()
  })

  it("Should check if 'cancel button' field is displayed", async () => {
    const cancel = await ContactsPage.cancelButton
    await expect(cancel).toBeDisplayed()
  })

  it("Should check if 'save button' field is displayed", async () => {
    const save = await ContactsPage.saveButton
    await expect(save).toBeDisplayed()
  })
})

describe("Messages screen check", () => {
  before(async () => {
    // Waiting for device connected through USB
    await browser.executeAsync((done) => {
      setTimeout(done, 5000)
    })
  })
  it("Should click Messages tab and check 'new message' button is displayed", async () => {
    const messagesTab = await NavigationTabs.messagesTab
    await messagesTab.waitForDisplayed()
    await messagesTab.click()
    await browser.executeAsync((done) => {
      setTimeout(done, 2000)
    })
    const newMessageBtn = await MessagesPage.newMessageButton
    await expect(newMessageBtn).toBeDisplayed()
  })

  it("Should click 'New Message' button and check it will become disabled", async () => {
    const newMessageBtn = await MessagesPage.newMessageButton
    await newMessageBtn.click()
    await expect(newMessageBtn).toBeDisabled()
  })

  it("Should check 'Search Contacts' input field is displayed", async () => {
    const searchInput = await MessagesPage.searchContactsInput
    await expect(searchInput).toBeDisplayed()
  })

  it("Should check if 'message' input field is displayed", async () => {
    const msgInput = await MessagesPage.messageInput
    await expect(msgInput).toBeDisplayed()
  })
})

describe("Settings screen check", () => {
  before(async () => {
    // Waiting for device connected through USB
    await browser.executeAsync((done) => {
      setTimeout(done, 5000)
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

describe("Overview screen check", () => {
  before(async () => {
    // Waiting for device connected through USB
    await browser.executeAsync((done) => {
      setTimeout(done, 5000)
    })
  })

  it("Click on Overview tab and check 'Overview' text label is displayed", async () => {
    const overviewTab = await NavigationTabs.overviewTab
    await overviewTab.waitForDisplayed()
    await overviewTab.click()
    await browser.executeAsync((done) => {
      setTimeout(done, 2000)
    })
    const locationTextLabel = await OverviewPage.locationTextLabel
    const locationTextLabelText = await locationTextLabel.getText()
    await expect(locationTextLabelText).toEqual("Overview")
  })

  it("Click on 'About Your Pure' button and check 'CHECK SAR INFORMATION' link is displayed", async () => {
    const about = await OverviewPage.aboutYourPureButton
    await about.click()

    const sarLink = await OverviewPage.checkSARInfoLink
    await expect(sarLink).toBeDisplayed()
  })
})
