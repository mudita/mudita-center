import { E2EMockClient } from "../../../../../libs/e2e-mock/client/src"
import { mockEntityDownloadProcess } from "../../helpers"
import { selectedContactsEntities } from "../../helpers/entity-fixtures"
import { expect } from "@wdio/globals"
import NavigationTabs from "../../page-objects/tabs.page"
import ManageFiles from "../../page-objects/manage-files"

describe("File manager overall check", () => {
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

  it("Open Manage Files tab and check if Phone storage section is opened", async () => {
    //open Manage Files
    const manageFilesButton = NavigationTabs.manageFilesButton
    await manageFilesButton.waitForDisplayed()
    await manageFilesButton.click()

    //check if Phone storage is opened
    const phoneStorageHeader = ManageFiles.phoneStorageHeader
    await expect(phoneStorageHeader).toBeDisplayed()
    await expect(phoneStorageHeader).toHaveText("Phone Storage")
    await browser.pause(60000000)
  })

  it("Check Music section", async () => {
    const musicCategoryHeader = ManageFiles.musicCategoryHeader
    //await expect(musicCategoryHeader).toBeDisplayed()
    //await expect(musicCategoryHeader).toHaveText("Music (1)")
    const firstFileInTheCategory = ManageFiles.firstFileInTheCategory
    await expect(firstFileInTheCategory).toBeDisplayed()
    await expect(firstFileInTheCategory).toHaveText("test.mp3")
    //await browser.pause(60000000)
  })
})
