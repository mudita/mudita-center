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

  it("Phone Storage - Check Music section", async () => {
    //check Music category header
    const musicCategoryHeader = ManageFiles.musicCategoryHeader
    await expect(musicCategoryHeader).toBeDisplayed()
    await expect(musicCategoryHeader).toHaveText("Music  (1)")

    //check Add files button
    const musicCategoryAddFilesButton = ManageFiles.musicCategoryAddFilesButton
    await expect(musicCategoryAddFilesButton).toBeDisplayed()

    //check file in Music category
    const firstFileInTheMusicCategory = ManageFiles.firstFileInTheMusicCategory
    await expect(firstFileInTheMusicCategory).toBeDisplayed()
    await expect(firstFileInTheMusicCategory).toHaveText("test.mp3")

    //check if text about no files is not present
    const musicCategoryEmptyTitle = ManageFiles.musicCategoryEmptyTitle
    await expect(musicCategoryEmptyTitle).not.toBeDisplayed()

    const musicCategoryEmptySubtext = ManageFiles.musicCategoryEmptySubtext
    await expect(musicCategoryEmptySubtext).not.toBeDisplayed()
  })

  it("Phone Storage - Check Photos section", async () => {
    //click Photos section
    const photosCategoryButton = ManageFiles.photosCategoryButton
    await photosCategoryButton.click()

    //check Photos category header
    const photosCategoryHeader = ManageFiles.photosCategoryHeader
    await expect(photosCategoryHeader).toBeDisplayed()
    await expect(photosCategoryHeader).toHaveText("Photos  (1)")

    //check Add files button
    const photosCategoryAddFilesButton =
      ManageFiles.photosCategoryAddFilesButton
    await expect(photosCategoryAddFilesButton).toBeDisplayed()

    //check file in Photos category
    const firstFileInThePhotosCategory =
      ManageFiles.firstFileInThePhotosCategory
    await expect(firstFileInThePhotosCategory).toBeDisplayed()
    await expect(firstFileInThePhotosCategory).toHaveText("image.png")

    //check if text about no files is not present
    const photosCategoryEmptyTitle = ManageFiles.photosCategoryEmptyTitle
    await expect(photosCategoryEmptyTitle).not.toBeDisplayed()

    const photosCategoryEmptySubtext = ManageFiles.photosCategoryEmptySubtext
    await expect(photosCategoryEmptySubtext).not.toBeDisplayed()
  })

  it("Phone Storage - Check E-Books section", async () => {
    //click E-Books section
    const ebooksCategoryButton = ManageFiles.ebooksCategoryButton
    await ebooksCategoryButton.click()

    //check E-books category header
    const ebooksCategoryHeader = ManageFiles.ebooksCategoryHeader
    await expect(ebooksCategoryHeader).toBeDisplayed()
    await expect(ebooksCategoryHeader).toHaveText("E-books")

    //check Add files button
    const ebooksCategoryAddFilesButton =
      ManageFiles.ebooksCategoryAddFilesButton
    await expect(ebooksCategoryAddFilesButton).toBeDisplayed()

    //check if E-books category is empty - check if there is no first file on the list
    const firstFileInTheEbooksCategory =
      ManageFiles.firstFileInTheEbooksCategory
    await expect(firstFileInTheEbooksCategory).not.toBeDisplayed()

    //check if text about no files is present
    const ebooksCategoryEmptyTitle = ManageFiles.ebooksCategoryEmptyTitle
    await expect(ebooksCategoryEmptyTitle).toBeDisplayed()
    await expect(ebooksCategoryEmptyTitle).toHaveText(
      "We couldn't find any files"
    )
    const ebooksCategoryEmptySubtext = ManageFiles.ebooksCategoryEmptySubtext
    await expect(ebooksCategoryEmptySubtext).toBeDisplayed()
    await expect(ebooksCategoryEmptySubtext).toHaveText(
      "Add E-book or PDF files from your computer and they'll transfer to your device automatically."
    )
  })

  it("Phone Storage - Check Apps section", async () => {
    //click Apps section
    const appsCategoryButton = ManageFiles.appsCategoryButton
    await appsCategoryButton.click()

    //check Apps category header
    const appsCategoryHeader = ManageFiles.appsCategoryHeader
    await expect(appsCategoryHeader).toBeDisplayed()
    await expect(appsCategoryHeader).toHaveText("Apps")

    //check Add files button
    const appsCategoryAddFilesButton = ManageFiles.appsCategoryAddFilesButton
    await expect(appsCategoryAddFilesButton).toBeDisplayed()

    //check if Apps category is empty - check if there is no first file on the list
    const firstFileInTheAppsCategory = ManageFiles.firstFileInTheAppsCategory
    await expect(firstFileInTheAppsCategory).not.toBeDisplayed()

    //check if text about no files is present
    const appsCategoryEmptyTitle = ManageFiles.appsCategoryEmptyTitle
    await expect(appsCategoryEmptyTitle).toBeDisplayed()
    await expect(appsCategoryEmptyTitle).toHaveText(
      "We couldn't find any files"
    )
    const appsCategoryEmptySubtext = ManageFiles.appsCategoryEmptySubtext
    await expect(appsCategoryEmptySubtext).toBeDisplayed()
    await expect(appsCategoryEmptySubtext).toHaveText(
      "Add android app (.apk) files and install them from here. As Kompakt is a minimalist E-ink device some apps may not work correctly."
    )
  })

  it("Open SD Card storage section and verify it", async () => {
    //open SD Card
    const sdCardButton = ManageFiles.sdCardButton
    await sdCardButton.click()

    //check if SD Card storage is opened
    const sdCardHeader = ManageFiles.sdCardHeader
    await expect(sdCardHeader).toBeDisplayed()
    await expect(sdCardHeader).toHaveText("SD card")
  })

  it("SD Card - Check Music section", async () => {
    //check Music category header
    const musicCategoryHeaderSD = ManageFiles.musicCategoryHeaderSD
    await expect(musicCategoryHeaderSD).toBeDisplayed()
    await expect(musicCategoryHeaderSD).toHaveText("Music")

    //check Add files button
    const musicCategoryAddFilesButtonSD =
      ManageFiles.musicCategoryAddFilesButtonSD
    await expect(musicCategoryAddFilesButtonSD).toBeDisplayed()

    //check if Music category is empty - check if there is no first file on the list
    const firstFileInTheMusicCategorySD =
      ManageFiles.firstFileInTheMusicCategorySD
    await expect(firstFileInTheMusicCategorySD).not.toBeDisplayed()

    //check if text about no files is present
    const musicCategoryEmptyTitleSD = ManageFiles.musicCategoryEmptyTitleSD
    await expect(musicCategoryEmptyTitleSD).toBeDisplayed()
    await expect(musicCategoryEmptyTitleSD).toHaveText(
      "We couldn't find any files"
    )
    const musicCategoryEmptySubtextSD = ManageFiles.musicCategoryEmptySubtextSD
    await expect(musicCategoryEmptySubtextSD).toBeDisplayed()
    await expect(musicCategoryEmptySubtextSD).toHaveText(
      "Add music files from your computer and they'll transfer to your device automatically."
    )
  })

  it("SD Card - Check Photos section", async () => {
    //click Photos section
    const photosCategoryButtonSD = ManageFiles.photosCategoryButtonSD
    await photosCategoryButtonSD.click()

    //check Photos category header
    const photosCategoryHeaderSD = ManageFiles.photosCategoryHeaderSD
    await expect(photosCategoryHeaderSD).toBeDisplayed()
    await expect(photosCategoryHeaderSD).toHaveText("Photos")

    //check Add files button
    const photosCategoryAddFilesButtonSD =
      ManageFiles.photosCategoryAddFilesButtonSD
    await expect(photosCategoryAddFilesButtonSD).toBeDisplayed()

    //check if Photos category is empty - check if there is no first file on the list
    const firstFileInThePhotosCategorySD =
      ManageFiles.firstFileInThePhotosCategorySD
    await expect(firstFileInThePhotosCategorySD).not.toBeDisplayed()

    //check if text about no files is present
    const photosCategoryEmptyTitleSD = ManageFiles.photosCategoryEmptyTitleSD
    await expect(photosCategoryEmptyTitleSD).toBeDisplayed()
    await expect(photosCategoryEmptyTitleSD).toHaveText(
      "We couldn't find any files"
    )
    const photosCategoryEmptySubtextSD =
      ManageFiles.photosCategoryEmptySubtextSD
    await expect(photosCategoryEmptySubtextSD).toBeDisplayed()
    await expect(photosCategoryEmptySubtextSD).toHaveText(
      "Add image files from your computer and they'll transfer to your device automatically."
    )
  })

  it("SD Card - Check E-Books section", async () => {
    //click E-Books section
    const ebooksCategoryButtonSD = ManageFiles.ebooksCategoryButtonSD
    await ebooksCategoryButtonSD.click()

    //check E-books category header
    const ebooksCategoryHeaderSD = ManageFiles.ebooksCategoryHeaderSD
    await expect(ebooksCategoryHeaderSD).toBeDisplayed()
    await expect(ebooksCategoryHeaderSD).toHaveText("E-books  (1)")

    //check Add files button
    const ebooksCategoryAddFilesButtonSD =
      ManageFiles.ebooksCategoryAddFilesButtonSD
    await expect(ebooksCategoryAddFilesButtonSD).toBeDisplayed()

    //check file in E-books category
    const firstFileInTheEbooksCategorySD =
      ManageFiles.firstFileInTheEbooksCategorySD
    await expect(firstFileInTheEbooksCategorySD).toBeDisplayed()
    await expect(firstFileInTheEbooksCategorySD).toHaveText("ebook.pdf")

    //check if text about no files is not present
    const ebooksCategoryEmptyTitleSD = ManageFiles.ebooksCategoryEmptyTitleSD
    await expect(ebooksCategoryEmptyTitleSD).not.toBeDisplayed()
    const ebooksCategoryEmptySubtextSD =
      ManageFiles.ebooksCategoryEmptySubtextSD
    await expect(ebooksCategoryEmptySubtextSD).not.toBeDisplayed()
  })

  it("SD Card - Check Apps section", async () => {
    //click Apps section
    const appsCategoryButtonSD = ManageFiles.appsCategoryButtonSD
    await appsCategoryButtonSD.click()

    //check Apps category header
    const appsCategoryHeaderSD = ManageFiles.appsCategoryHeaderSD
    await expect(appsCategoryHeaderSD).toBeDisplayed()
    await expect(appsCategoryHeaderSD).toHaveText("Apps  (1)")

    //check Add files button
    const appsCategoryAddFilesButtonSD =
      ManageFiles.appsCategoryAddFilesButtonSD
    await expect(appsCategoryAddFilesButtonSD).toBeDisplayed()

    //check file in Apps category
    const firstFileInTheAppsCategorySD =
      ManageFiles.firstFileInTheAppsCategorySD
    await expect(firstFileInTheAppsCategorySD).toBeDisplayed()
    await expect(firstFileInTheAppsCategorySD).toHaveText("app.apk")

    //check if text about no files is not present
    const appsCategoryEmptyTitleSD = ManageFiles.appsCategoryEmptyTitleSD
    await expect(appsCategoryEmptyTitleSD).not.toBeDisplayed()

    const appsCategoryEmptySubtextSD = ManageFiles.appsCategoryEmptySubtextSD
    await expect(appsCategoryEmptySubtextSD).not.toBeDisplayed()
  })
})
