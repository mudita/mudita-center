import { E2EMockClient } from "../../../../../libs/e2e-mock/client/src"
import { expect } from "@wdio/globals"
import NavigationTabs from "../../page-objects/tabs.page"
import ManageFiles from "../../page-objects/manage-files"

describe("File manager Install apk modal check", () => {
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

  it("Phone Storage", async () => {
    //click Apps section
    const appsCategoryButton = ManageFiles.appsCategoryButton
    await appsCategoryButton.click()

    //check file in Apps category
    const firstFileInTheAppsCategory = ManageFiles.firstFileInTheAppsCategory
    await expect(firstFileInTheAppsCategory).toBeDisplayed()
    await expect(firstFileInTheAppsCategory).toHaveText("app.apk")
    await firstFileInTheAppsCategory.click()

    //check install apk modal
    const firstFileInTheAppsCategoryInstallModal =
      ManageFiles.firstFileInTheAppsCategoryInstallModal
    await expect(firstFileInTheAppsCategoryInstallModal).toBeDisplayed()

    //check modal title
    const firstFileInTheAppsCategoryInstallModalTitle =
      ManageFiles.firstFileInTheAppsCategoryInstallModalTitle
    await expect(firstFileInTheAppsCategoryInstallModalTitle).toHaveText(
      "Continue install of third party app?"
    )

    //check modal body
    const firstFileInTheAppsCategoryInstallModalBody =
      ManageFiles.firstFileInTheAppsCategoryInstallModalBody
    await expect(firstFileInTheAppsCategoryInstallModalBody).toHaveText(
      "We can’t guarantee that Kompakt or the third party app will work correctly if you continue the install."
    )

    //click back button on installation modal
    const firstFileInTheAppsCategoryInstallModalBackButton =
      ManageFiles.firstFileInTheAppsCategoryInstallModalBackButton
    await firstFileInTheAppsCategoryInstallModalBackButton.click()
  })

  it("SD Card", async () => {
    //open SD Card
    const sdCardButton = ManageFiles.sdCardButton
    await sdCardButton.click()

    //click Apps section
    const appsCategoryButtonSD = ManageFiles.appsCategoryButtonSD
    await appsCategoryButtonSD.click()

    //check file in Apps category
    const firstFileInTheAppsCategorySD =
      ManageFiles.firstFileInTheAppsCategorySD
    await expect(firstFileInTheAppsCategorySD).toBeDisplayed()
    await expect(firstFileInTheAppsCategorySD).toHaveText("app.apk")
    await firstFileInTheAppsCategorySD.click()

    //check install apk modal
    const firstFileInTheAppsCategoryInstallModalSD =
      ManageFiles.firstFileInTheAppsCategoryInstallModalSD
    await expect(firstFileInTheAppsCategoryInstallModalSD).toBeDisplayed()

    //check modal title
    const firstFileInTheAppsCategoryInstallModalTitleSD =
      ManageFiles.firstFileInTheAppsCategoryInstallModalTitleSD
    await expect(firstFileInTheAppsCategoryInstallModalTitleSD).toHaveText(
      "Continue install of third party app?"
    )

    //check modal body
    const firstFileInTheAppsCategoryInstallModalBodySD =
      ManageFiles.firstFileInTheAppsCategoryInstallModalBodySD
    await expect(firstFileInTheAppsCategoryInstallModalBodySD).toHaveText(
      "We can’t guarantee that Kompakt or the third party app will work correctly if you continue the install."
    )
  })
})
