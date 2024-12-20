import { E2EMockClient } from "../../../../../libs/e2e-mock/client/src"
import {
  overviewConfigForBackup,
  overviewDataWithOneSimCard,
} from "../../../../../libs/e2e-mock/responses/src"
import { mockEntityDownloadProcess } from "../../helpers/mock-entity-download-process.helper"
import { selectedContactsEntities } from "../../helpers/entity-fixtures"
import tabsPage from "../../page-objects/tabs.page"

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

    await browser.pause(6000)
    const menuItem = await $(`//a[@href="#/generic/mc-overview"]`)

    await menuItem.waitForDisplayed({ timeout: 10000 })
    await expect(menuItem).toBeDisplayed()
  })

  it("Click Contacts tab", async () => {
    // mock contacts function for testing/modification purposes
    // mockEntityDownloadProcess({
    //   path: "path-1",
    //   data: selectedContactsEntities,
    //   entityType: "contacts",
    // })
    const contactsKompaktTab = tabsPage.contactsKompaktTab
    await contactsKompaktTab.click()
  })
})
