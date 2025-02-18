import { E2EMockClient } from "../../../../../libs/e2e-mock/client/src"
import tabsPage from "../../page-objects/tabs.page"
import ContactsKompaktPage from "../../page-objects/contacts-kompakt"
import { mockEntityDownloadProcess } from "../../helpers"
import { selectedContactsEntities } from "../../helpers/entity-fixtures"

describe("E2E mock sample - overview view", () => {
  before(async () => {
    E2EMockClient.connect()
    //wait for a connection to be established
    await browser.waitUntil(() => {
      return E2EMockClient.checkConnection()
    })
  })

  after(() => {
    E2EMockClient.stopServer()
    E2EMockClient.disconnect()
  })

  it("Connect device", async () => {
    E2EMockClient.addDevice({
      path: "path-1",
      serialNumber: "first-serial-number",
    })

    // mock contacts function for testing/modification purposes
    mockEntityDownloadProcess({
      path: "path-1",
      data: selectedContactsEntities,
      entityType: "contacts",
    })

    await browser.pause(6000)
    const menuItem = await $(`//a[@href="#/generic/mc-overview"]`)

    await menuItem.waitForDisplayed({ timeout: 10000 })
    await expect(menuItem).toBeDisplayed()
  })

  it("Click Contacts tab and check contacts counter", async () => {
    const contactsKompaktTab = tabsPage.contactsKompaktTab
    await contactsKompaktTab.click()

    const contactsCounter = ContactsKompaktPage.contactsCounter
    await expect(contactsCounter).toBeDisplayed()
    await expect(contactsCounter).toHaveText("Contacts (17)")
  })

  it("Select sixth contact to open contact details", async () => {
    const contactsList = await ContactsKompaktPage.allContactsTableRows
    await contactsList[5].click()
  })

  it("Check contact's details", async () => {
    //check contact title in Details view
    const contactDisplayNameHeader =
      await ContactsKompaktPage.contactDisplayNameHeader
    await expect(contactDisplayNameHeader).toHaveText("Dr. Michael Johnson PhD")

    //check contact information subtitle
    const contactDetailsSubtitleContactInformation =
      await ContactsKompaktPage.contactDetailsSubtitleContactInformation
    await expect(contactDetailsSubtitleContactInformation).toHaveText(
      "Contact information"
    )

    //check contact information Phone Number
    const contactDetailsPhoneNumber =
      await ContactsKompaktPage.contactDetailsPhoneNumber
    const contactDetailsPhoneNumberValue =
      await ContactsKompaktPage.contactDetailsPhoneNumberValue
    await expect(contactDetailsPhoneNumber).toHaveText("Phone number")
    await expect(contactDetailsPhoneNumberValue).toHaveText("+49876543210")

    //check contact information First Name
    const contactDetailsFirstName =
      await ContactsKompaktPage.contactDetailsFirstName
    const contactDetailsFirstNameValue =
      await ContactsKompaktPage.contactDetailsFirstNameValue
    await expect(contactDetailsFirstName).toHaveText("First name")
    await expect(contactDetailsFirstNameValue).toHaveText("Michael")

    //check contact information Last Name
    const contactDetailsLastName =
      await ContactsKompaktPage.contactDetailsLastName
    const contactDetailsLastNameValue =
      await ContactsKompaktPage.contactDetailsLastNameValue
    await expect(contactDetailsLastName).toHaveText("Last name")
    await expect(contactDetailsLastNameValue).toHaveText("Johnson")

    //check contact information Name Prefix
    const contactDetailsNamePrefix =
      await ContactsKompaktPage.contactDetailsNamePrefix
    const contactDetailsNamePrefixValue =
      await ContactsKompaktPage.contactDetailsNamePrefixValue
    await expect(contactDetailsNamePrefix).toHaveText("Name prefix")
    await expect(contactDetailsNamePrefixValue).toHaveText("Dr.")

    //check contact information Middle Name
    const contactDetailsMiddleName =
      await ContactsKompaktPage.contactDetailsMiddleName
    const contactDetailsMiddleNameValue =
      await ContactsKompaktPage.contactDetailsMiddleNameValue
    await expect(contactDetailsMiddleName).toHaveText("Middle name")
    await expect(contactDetailsMiddleNameValue).toHaveText("David")

    //check contact information Name Suffix
    const contactDetailsNameSuffix =
      await ContactsKompaktPage.contactDetailsNameSuffix
    const contactDetailsNameSuffixValue =
      await ContactsKompaktPage.contactDetailsNameSuffixValue
    await expect(contactDetailsNameSuffix).toHaveText("Name suffix")
    await expect(contactDetailsNameSuffixValue).toHaveText("PhD")

    //check contact information Email
    const contactDetailsEmail = await ContactsKompaktPage.contactDetailsEmail
    const contactDetailsEmailValue =
      await ContactsKompaktPage.contactDetailsEmailValue
    await expect(contactDetailsEmail).toHaveText("Email")
    await expect(contactDetailsEmailValue).toHaveText(
      "michael.j@researchlab.com"
    )

    //check contact information Company
    const contactDetailsCompany =
      await ContactsKompaktPage.contactDetailsCompany
    const contactDetailsCompanyValue =
      await ContactsKompaktPage.contactDetailsCompanyValue
    await expect(contactDetailsCompany).toHaveText("Company")
    await expect(contactDetailsCompanyValue).toHaveText("Research Labs")
  })

  it("Close contact details page", async () => {
    const closeContactDetailsButton =
      await ContactsKompaktPage.closeContactDetailsButton
    await closeContactDetailsButton.click()

    //check if elements from contacts details bar are not displayed, to assure that Contacts Details panel is closed
    await expect(closeContactDetailsButton).not.toBeDisplayed()
    const contactDetailsDeleteButton =
      ContactsKompaktPage.contactDetailsDeleteButton
    await expect(contactDetailsDeleteButton).not.toBeDisplayed()
  })

  it("Select first contact to open contact details and check if there is ellipsis at the end", async () => {
    const contactsList = await ContactsKompaktPage.allContactsTableRows
    await contactsList[0].click()

    const elementEllipsis = await ContactsKompaktPage.contactDisplayNameHeader

    const computedStyle = await browser.execute((el) => {
      const domElement = el as unknown as HTMLElement // Ensure it's treated correctly
      const styles = window.getComputedStyle(domElement)

      return {
        textOverflow: styles.textOverflow,
        whiteSpace: styles.whiteSpace,
        overflow: styles.overflow,
      }
    }, elementEllipsis)

    // Assertions to verify if ellipsis is actually applied
    await expect(computedStyle.textOverflow).toBe("ellipsis")
    await expect(computedStyle.whiteSpace).toBe("nowrap")
    await expect(computedStyle.overflow).toBe("hidden")
  })

  it("Check if phone number columns are not visible when Contact Details are opened", async () => {
    const contactPhoneNumberColumn =
      await ContactsKompaktPage.contactPhoneNumberColumn
    await expect(contactPhoneNumberColumn).not.toBeDisplayed()
  })
})
