import { E2EMockClient } from "../../../../../libs/e2e-mock/client/src"
import { expect } from "@wdio/globals"
import NavigationTabs from "../../page-objects/tabs.page"
import ManageFiles from "../../page-objects/manage-files"

describe("File manager DELETE APK text check", () => {
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

  it("Open Manage Files tab and check if Phone storage section is opened", async () => {
    //open Manage Files
    const manageFilesButton = NavigationTabs.manageFilesButton
    await manageFilesButton.waitForDisplayed()
    await manageFilesButton.click()

    //check if Phone storage is opened
    const phoneStorageHeader = ManageFiles.phoneStorageHeader
    await expect(phoneStorageHeader).toBeDisplayed()
    await expect(phoneStorageHeader).toHaveText("Phone Storage")
  })

  it("Phone Storage - 1 file", async () => {
    //click Apps section
    const appsCategoryButton = ManageFiles.appsCategoryButton
    await appsCategoryButton.click()

    //select checkbox button
    const checkboxFirstFileApps = ManageFiles.checkboxFirstFileApps
    await expect(checkboxFirstFileApps).toBeDisplayed()
    await checkboxFirstFileApps.click()

    //check Delete button
    const firstFileInTheAppsCategoryDeleteButton =
      ManageFiles.firstFileInTheAppsCategoryDeleteButton
    await expect(firstFileInTheAppsCategoryDeleteButton).toBeDisplayed()
    await expect(firstFileInTheAppsCategoryDeleteButton).toHaveText(
      "DELETE APK"
    )

    // //check delete file modal
    // await firstFileInTheAppsCategoryDeleteButton.click()
    // const firstFileInTheAppsCategoryDeleteModal =
    //   ManageFiles.firstFileInTheAppsCategoryDeleteModal
    // await expect(firstFileInTheAppsCategoryDeleteModal).toBeDisplayed()
  })

  it("SD Card - 1 file, multiple files", async () => {
    //open SD Card
    const sdCardButton = ManageFiles.sdCardButton
    await sdCardButton.click()

    //click Apps section
    const appsCategoryButtonSD = ManageFiles.appsCategoryButtonSD
    await appsCategoryButtonSD.click()

    //select one file and check "Delete APK" for 1 file
    const checkboxFirstFileAppsSD = ManageFiles.checkboxFirstFileAppsSD
    await checkboxFirstFileAppsSD.click() //select first file

    // check delete button for 1 file
    const firstFileInTheAppsCategoryDeleteButtonSD =
      ManageFiles.firstFileInTheAppsCategoryDeleteButtonSD
    await expect(firstFileInTheAppsCategoryDeleteButtonSD).toBeDisplayed()
    await expect(firstFileInTheAppsCategoryDeleteButtonSD).toHaveText(
      "DELETE APK"
    )

    //select all files
    const checkboxAllFilesAppsSD = ManageFiles.checkboxAllFilesAppsSD
    await expect(checkboxAllFilesAppsSD).toBeDisplayed()
    await checkboxAllFilesAppsSD.click() //select all files

    //check "Delete APK" for multiple files
    await expect(firstFileInTheAppsCategoryDeleteButtonSD).toBeDisplayed()
    await expect(firstFileInTheAppsCategoryDeleteButtonSD).toHaveText(
      "DELETE APK"
    )

    // //check delete file modal
    // await firstFileInTheAppsCategoryDeleteButtonSD.click()
    // const firstFileInTheAppsCategoryDeleteModalSD =
    //   ManageFiles.firstFileInTheAppsCategoryDeleteModalSD
    // await expect(firstFileInTheAppsCategoryDeleteModalSD).toBeDisplayed()

    // const iconExclamation = ManageFiles.iconExclamation
    // await expect(iconExclamation).toBeDisplayed()
  })
})
