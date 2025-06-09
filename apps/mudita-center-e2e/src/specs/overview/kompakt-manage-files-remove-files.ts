import { E2EMockClient } from "../../../../../libs/e2e-mock/client/src"
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

  it("Phone Storage -  Music section", async () => {
    //check Music category header
    const musicCategoryHeader = ManageFiles.musicCategoryHeader
    await expect(musicCategoryHeader).toBeDisplayed()
    await expect(musicCategoryHeader).toHaveText("Music  (1)")

    //check file in Music category
    const firstFileInTheMusicCategory = ManageFiles.firstFileInTheMusicCategory
    await expect(firstFileInTheMusicCategory).toBeDisplayed()
    await expect(firstFileInTheMusicCategory).toHaveText("test.mp3")

    //remove the file
    const checkboxFirstFileMusic = ManageFiles.checkboxFirstFileMusic
    await expect(checkboxFirstFileMusic).toBeDisplayed()
    await checkboxFirstFileMusic.click()

    //click delete file button
    const firstFileInTheMusicCategoryDeleteButton =
      ManageFiles.firstFileInTheMusicCategoryDeleteButton
    await expect(firstFileInTheMusicCategoryDeleteButton).toBeDisplayed()
    await firstFileInTheMusicCategoryDeleteButton.click()

    //check delete file modal
    const firstFileInTheMusicCategoryDeleteModal =
      ManageFiles.firstFileInTheMusicCategoryDeleteModal
    await expect(firstFileInTheMusicCategoryDeleteModal).toBeDisplayed()

    const iconExclamation = ManageFiles.iconExclamation
    await expect(iconExclamation).toBeDisplayed()

    //cancel deletion
    const firstFileInTheMusicCategoryDeleteModalCancelButton =
      ManageFiles.firstFileInTheMusicCategoryDeleteModalCancelButton
    await expect(
      firstFileInTheMusicCategoryDeleteModalCancelButton
    ).toBeDisplayed()
    await firstFileInTheMusicCategoryDeleteModalCancelButton.click()

    //click delete file button again
    await firstFileInTheMusicCategoryDeleteButton.click()

    const firstFileInTheMusicCategoryDeleteModalDeleteFileButton =
      ManageFiles.firstFileInTheMusicCategoryDeleteModalDeleteFileButton
    await expect(
      firstFileInTheMusicCategoryDeleteModalDeleteFileButton
    ).toBeDisplayed()
    await firstFileInTheMusicCategoryDeleteModalDeleteFileButton.click()

    // to check after deletion of the file/files

    //check no files available text and subtext
    const musicCategoryEmptyTitle = ManageFiles.musicCategoryEmptyTitle
    await expect(musicCategoryEmptyTitle).toBeDisplayed()
    await expect(musicCategoryEmptyTitle).toHaveText(
      "We couldn't find any files"
    )

    const musicCategoryEmptySubtext = ManageFiles.musicCategoryEmptySubtext
    await expect(musicCategoryEmptySubtext).toBeDisplayed()
    await expect(musicCategoryEmptySubtext).toHaveText(
      "Add music files from your computer and they'll transfer to your device automatically."
    )
  })

  it("Phone Storage - Photos section", async () => {
    //click Photos section
    const photosCategoryButton = ManageFiles.photosCategoryButton
    await photosCategoryButton.click()

    //check Photos category header
    const photosCategoryHeader = ManageFiles.photosCategoryHeader
    await expect(photosCategoryHeader).toBeDisplayed()
    await expect(photosCategoryHeader).toHaveText("Photos  (1)")

    //check file in Photos category
    const firstFileInThePhotosCategory =
      ManageFiles.firstFileInThePhotosCategory
    await expect(firstFileInThePhotosCategory).toBeDisplayed()
    await expect(firstFileInThePhotosCategory).toHaveText("image.png")

    //remove the file
    const checkboxFirstFilePhotos = ManageFiles.checkboxFirstFilePhotos
    await expect(checkboxFirstFilePhotos).toBeDisplayed()
    await checkboxFirstFilePhotos.click()

    //click delete file button
    const firstFileInThePhotosCategoryDeleteButton =
      ManageFiles.firstFileInThePhotosCategoryDeleteButton
    await expect(firstFileInThePhotosCategoryDeleteButton).toBeDisplayed()
    await firstFileInThePhotosCategoryDeleteButton.click()

    //check delete file modal
    const firstFileInThePhotosCategoryDeleteModal =
      ManageFiles.firstFileInThePhotosCategoryDeleteModal
    await expect(firstFileInThePhotosCategoryDeleteModal).toBeDisplayed()

    const iconExclamation = ManageFiles.iconExclamation
    await expect(iconExclamation).toBeDisplayed()

    //cancel deletion
    const firstFileInThePhotosCategoryDeleteModalCancelButton =
      ManageFiles.firstFileInThePhotosCategoryDeleteModalCancelButton
    await expect(
      firstFileInThePhotosCategoryDeleteModalCancelButton
    ).toBeDisplayed()
    await firstFileInThePhotosCategoryDeleteModalCancelButton.click()

    //click delete file button again
    await firstFileInThePhotosCategoryDeleteButton.click()

    const firstFileInThePhotosCategoryDeleteModalDeleteFileButton =
      ManageFiles.firstFileInThePhotosCategoryDeleteModalDeleteFileButton
    await expect(
      firstFileInThePhotosCategoryDeleteModalDeleteFileButton
    ).toBeDisplayed()
    await firstFileInThePhotosCategoryDeleteModalDeleteFileButton.click()

    // to check after deletion of the file/files

    //check no files available text and subtext
    const photosCategoryEmptyTitle = ManageFiles.photosCategoryEmptyTitle
    await expect(photosCategoryEmptyTitle).toBeDisplayed()
    await expect(photosCategoryEmptyTitle).toHaveText(
      "We couldn't find any files"
    )

    const photosCategoryEmptySubtext = ManageFiles.photosCategoryEmptySubtext
    await expect(photosCategoryEmptySubtext).toBeDisplayed()
    await expect(photosCategoryEmptySubtext).toHaveText(
      "Add image files from your computer and they'll transfer to your device automatically."
    )
  })

  it("Phone Storage - E-Books section", async () => {
    //click E-Books section
    const ebooksCategoryButton = ManageFiles.ebooksCategoryButton
    await ebooksCategoryButton.click()

    //check E-books category header
    const ebooksCategoryHeader = ManageFiles.ebooksCategoryHeader
    await expect(ebooksCategoryHeader).toBeDisplayed()
    await expect(ebooksCategoryHeader).toHaveText("E-books  (1)")

    //check file in E-books category
    const firstFileInTheEbooksCategory =
      ManageFiles.firstFileInTheEbooksCategory
    await expect(firstFileInTheEbooksCategory).toBeDisplayed()
    await expect(firstFileInTheEbooksCategory).toHaveText("ebook.pdf")

    //remove the file
    const checkboxFirstFileEbooks = ManageFiles.checkboxFirstFileEbooks
    await expect(checkboxFirstFileEbooks).toBeDisplayed()
    await checkboxFirstFileEbooks.click()

    //click delete file button
    const firstFileInTheEbooksCategoryDeleteButton =
      ManageFiles.firstFileInTheEbooksCategoryDeleteButton
    await expect(firstFileInTheEbooksCategoryDeleteButton).toBeDisplayed()
    await firstFileInTheEbooksCategoryDeleteButton.click()

    //check delete file modal
    const firstFileInTheEbooksCategoryDeleteModal =
      ManageFiles.firstFileInTheEbooksCategoryDeleteModal
    await expect(firstFileInTheEbooksCategoryDeleteModal).toBeDisplayed()

    const iconExclamation = ManageFiles.iconExclamation
    await expect(iconExclamation).toBeDisplayed()

    //cancel deletion
    const firstFileInTheEbooksCategoryDeleteModalCancelButton =
      ManageFiles.firstFileInTheEbooksCategoryDeleteModalCancelButton
    await expect(
      firstFileInTheEbooksCategoryDeleteModalCancelButton
    ).toBeDisplayed()
    await firstFileInTheEbooksCategoryDeleteModalCancelButton.click()

    //click delete file button again
    await firstFileInTheEbooksCategoryDeleteButton.click()

    const firstFileInTheEbooksCategoryDeleteModalDeleteFileButton =
      ManageFiles.firstFileInTheEbooksCategoryDeleteModalDeleteFileButton
    await expect(
      firstFileInTheEbooksCategoryDeleteModalDeleteFileButton
    ).toBeDisplayed()
    await firstFileInTheEbooksCategoryDeleteModalDeleteFileButton.click()

    // to check after deletion of the file/files

    //check no files available text and subtext
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

  it("Phone Storage -  Apps section", async () => {
    //click Apps section
    const appsCategoryButton = ManageFiles.appsCategoryButton
    await appsCategoryButton.click()

    //check Apps category header
    const appsCategoryHeader = ManageFiles.appsCategoryHeader
    await expect(appsCategoryHeader).toBeDisplayed()
    await expect(appsCategoryHeader).toHaveText("Apps  (1)")

    //check Add files button
    const appsCategoryAddFilesButton = ManageFiles.appsCategoryAddFilesButton
    await expect(appsCategoryAddFilesButton).toBeDisplayed()

    //check file in Apps category
    const firstFileInTheAppsCategory = ManageFiles.firstFileInTheAppsCategory
    await expect(firstFileInTheAppsCategory).toBeDisplayed()
    await expect(firstFileInTheAppsCategory).toHaveText("app.apk")

    //remove the file
    const checkboxFirstFileApps = ManageFiles.checkboxFirstFileApps
    await expect(checkboxFirstFileApps).toBeDisplayed()
    await checkboxFirstFileApps.click()

    //click delete file button
    const firstFileInTheAppsCategoryDeleteButton =
      ManageFiles.firstFileInTheAppsCategoryDeleteButton
    await expect(firstFileInTheAppsCategoryDeleteButton).toBeDisplayed()
    await firstFileInTheAppsCategoryDeleteButton.click()

    //check delete file modal
    const firstFileInTheAppsCategoryDeleteModal =
      ManageFiles.firstFileInTheAppsCategoryDeleteModal
    await expect(firstFileInTheAppsCategoryDeleteModal).toBeDisplayed()

    const iconExclamation = ManageFiles.iconExclamation
    await expect(iconExclamation).toBeDisplayed()

    //cancel deletion
    const firstFileInTheAppsCategoryDeleteModalCancelButton =
      ManageFiles.firstFileInTheAppsCategoryDeleteModalCancelButton
    await expect(
      firstFileInTheAppsCategoryDeleteModalCancelButton
    ).toBeDisplayed()
    await firstFileInTheAppsCategoryDeleteModalCancelButton.click()

    //click delete file button again
    await firstFileInTheAppsCategoryDeleteButton.click()

    const firstFileInTheAppsCategoryDeleteModalDeleteFileButton =
      ManageFiles.firstFileInTheAppsCategoryDeleteModalDeleteFileButton
    await expect(
      firstFileInTheAppsCategoryDeleteModalDeleteFileButton
    ).toBeDisplayed()
    await firstFileInTheAppsCategoryDeleteModalDeleteFileButton.click()

    // to check after deletion of the file/files

    //check no files available text and subtext
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

  it("SD Card -  Music section", async () => {
    //open SD Card
    const sdCardButton = ManageFiles.sdCardButton
    await sdCardButton.click()

    //check Music category header
    const musicCategoryHeaderSD = ManageFiles.musicCategoryHeaderSD
    await expect(musicCategoryHeaderSD).toBeDisplayed()
    await expect(musicCategoryHeaderSD).toHaveText("Music  (1)")

    //check file in Music category
    const firstFileInTheMusicCategorySD =
      ManageFiles.firstFileInTheMusicCategorySD
    await expect(firstFileInTheMusicCategorySD).toBeDisplayed()
    await expect(firstFileInTheMusicCategorySD).toHaveText("test.mp3")

    //remove the file
    const checkboxFirstFileMusicSD = ManageFiles.checkboxFirstFileMusicSD
    await expect(checkboxFirstFileMusicSD).toBeDisplayed()
    await checkboxFirstFileMusicSD.click()

    //click delete file button
    const firstFileInTheMusicCategoryDeleteButtonSD =
      ManageFiles.firstFileInTheMusicCategoryDeleteButtonSD
    await expect(firstFileInTheMusicCategoryDeleteButtonSD).toBeDisplayed()
    await firstFileInTheMusicCategoryDeleteButtonSD.click()

    //check delete file modal
    const firstFileInTheMusicCategoryDeleteModalSD =
      ManageFiles.firstFileInTheMusicCategoryDeleteModalSD
    await expect(firstFileInTheMusicCategoryDeleteModalSD).toBeDisplayed()

    const iconExclamation = ManageFiles.iconExclamation
    await expect(iconExclamation).toBeDisplayed()

    //cancel deletion
    const firstFileInTheMusicCategoryDeleteModalCancelButtonSD =
      ManageFiles.firstFileInTheMusicCategoryDeleteModalCancelButtonSD
    await expect(
      firstFileInTheMusicCategoryDeleteModalCancelButtonSD
    ).toBeDisplayed()
    await firstFileInTheMusicCategoryDeleteModalCancelButtonSD.click()

    //click delete file button again
    await firstFileInTheMusicCategoryDeleteButtonSD.click()

    const firstFileInTheMusicCategoryDeleteModalDeleteFileButtonSD =
      ManageFiles.firstFileInTheMusicCategoryDeleteModalDeleteFileButtonSD
    await expect(
      firstFileInTheMusicCategoryDeleteModalDeleteFileButtonSD
    ).toBeDisplayed()
    await firstFileInTheMusicCategoryDeleteModalDeleteFileButtonSD.click()

    // to check after deletion of the file/files

    //check no files available text and subtext
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

  it("SD Card - Photos section", async () => {
    //click Photos section
    const photosCategoryButtonSD = ManageFiles.photosCategoryButtonSD
    await photosCategoryButtonSD.click()

    //check Photos category header
    const photosCategoryHeaderSD = ManageFiles.photosCategoryHeaderSD
    await expect(photosCategoryHeaderSD).toBeDisplayed()
    await expect(photosCategoryHeaderSD).toHaveText("Photos  (1)")

    //check file in Photos category
    const firstFileInThePhotosCategorySD =
      ManageFiles.firstFileInThePhotosCategorySD
    await expect(firstFileInThePhotosCategorySD).toBeDisplayed()
    await expect(firstFileInThePhotosCategorySD).toHaveText("image.png")

    //remove the file
    const checkboxFirstFilePhotosSD = ManageFiles.checkboxFirstFilePhotosSD
    await expect(checkboxFirstFilePhotosSD).toBeDisplayed()
    await checkboxFirstFilePhotosSD.click()

    //click delete file button
    const firstFileInThePhotosCategoryDeleteButtonSD =
      ManageFiles.firstFileInThePhotosCategoryDeleteButtonSD
    await expect(firstFileInThePhotosCategoryDeleteButtonSD).toBeDisplayed()
    await firstFileInThePhotosCategoryDeleteButtonSD.click()

    //check delete file modal
    const firstFileInThePhotosCategoryDeleteModalSD =
      ManageFiles.firstFileInThePhotosCategoryDeleteModalSD
    await expect(firstFileInThePhotosCategoryDeleteModalSD).toBeDisplayed()

    const iconExclamation = ManageFiles.iconExclamation
    await expect(iconExclamation).toBeDisplayed()

    //cancel deletion
    const firstFileInThePhotosCategoryDeleteModalCancelButtonSD =
      ManageFiles.firstFileInThePhotosCategoryDeleteModalCancelButtonSD
    await expect(
      firstFileInThePhotosCategoryDeleteModalCancelButtonSD
    ).toBeDisplayed()
    await firstFileInThePhotosCategoryDeleteModalCancelButtonSD.click()

    //click delete file button again
    await firstFileInThePhotosCategoryDeleteButtonSD.click()

    const firstFileInThePhotosCategoryDeleteModalDeleteFileButtonSD =
      ManageFiles.firstFileInThePhotosCategoryDeleteModalDeleteFileButtonSD
    await expect(
      firstFileInThePhotosCategoryDeleteModalDeleteFileButtonSD
    ).toBeDisplayed()
    await firstFileInThePhotosCategoryDeleteModalDeleteFileButtonSD.click()

    // to check after deletion of the file/files

    //check no files available text and subtext
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

  it("SD Card - E-Books section", async () => {
    //click E-Books section
    const ebooksCategoryButtonSD = ManageFiles.ebooksCategoryButtonSD
    await ebooksCategoryButtonSD.click()

    //check E-books category header
    const ebooksCategoryHeaderSD = ManageFiles.ebooksCategoryHeaderSD
    await expect(ebooksCategoryHeaderSD).toBeDisplayed()
    await expect(ebooksCategoryHeaderSD).toHaveText("E-books  (1)")

    //check file in E-books category
    const firstFileInTheEbooksCategorySD =
      ManageFiles.firstFileInTheEbooksCategorySD
    await expect(firstFileInTheEbooksCategorySD).toBeDisplayed()
    await expect(firstFileInTheEbooksCategorySD).toHaveText("ebook.pdf")

    //remove the file
    const checkboxFirstFileEbooksSD = ManageFiles.checkboxFirstFileEbooksSD
    await expect(checkboxFirstFileEbooksSD).toBeDisplayed()
    await checkboxFirstFileEbooksSD.click()

    //click delete file button
    const firstFileInTheEbooksCategoryDeleteButtonSD =
      ManageFiles.firstFileInTheEbooksCategoryDeleteButtonSD
    await expect(firstFileInTheEbooksCategoryDeleteButtonSD).toBeDisplayed()
    await firstFileInTheEbooksCategoryDeleteButtonSD.click()

    //check delete file modal
    const firstFileInTheEbooksCategoryDeleteModalSD =
      ManageFiles.firstFileInTheEbooksCategoryDeleteModalSD
    await expect(firstFileInTheEbooksCategoryDeleteModalSD).toBeDisplayed()

    const iconExclamation = ManageFiles.iconExclamation
    await expect(iconExclamation).toBeDisplayed()

    //cancel deletion
    const firstFileInTheEbooksCategoryDeleteModalCancelButtonSD =
      ManageFiles.firstFileInTheEbooksCategoryDeleteModalCancelButtonSD
    await expect(
      firstFileInTheEbooksCategoryDeleteModalCancelButtonSD
    ).toBeDisplayed()
    await firstFileInTheEbooksCategoryDeleteModalCancelButtonSD.click()

    //click delete file button again
    await firstFileInTheEbooksCategoryDeleteButtonSD.click()

    const firstFileInTheEbooksCategoryDeleteModalDeleteFileButtonSD =
      ManageFiles.firstFileInTheEbooksCategoryDeleteModalDeleteFileButtonSD
    await expect(
      firstFileInTheEbooksCategoryDeleteModalDeleteFileButtonSD
    ).toBeDisplayed()
    await firstFileInTheEbooksCategoryDeleteModalDeleteFileButtonSD.click()

    // to check after deletion of the file/files

    //check no files available text and subtext
    const ebooksCategoryEmptyTitleSD = ManageFiles.ebooksCategoryEmptyTitleSD
    await expect(ebooksCategoryEmptyTitleSD).toBeDisplayed()
    await expect(ebooksCategoryEmptyTitleSD).toHaveText(
      "We couldn't find any files"
    )

    const ebooksCategoryEmptySubtextSD =
      ManageFiles.ebooksCategoryEmptySubtextSD
    await expect(ebooksCategoryEmptySubtextSD).toBeDisplayed()
    await expect(ebooksCategoryEmptySubtextSD).toHaveText(
      "Add E-book or PDF files from your computer and they'll transfer to your device automatically."
    )
  })

  it("SD Card -  Apps section", async () => {
    //click Apps section
    const appsCategoryButtonSD = ManageFiles.appsCategoryButtonSD
    await appsCategoryButtonSD.click()

    //check Apps category header
    const appsCategoryHeaderSD = ManageFiles.appsCategoryHeaderSD
    await expect(appsCategoryHeaderSD).toBeDisplayed()
    await expect(appsCategoryHeaderSD).toHaveText("Apps  (2)")

    //check Add files button
    const appsCategoryAddFilesButtonSD =
      ManageFiles.appsCategoryAddFilesButtonSD
    await expect(appsCategoryAddFilesButtonSD).toBeDisplayed()

    //check file in Apps category
    const firstFileInTheAppsCategorySD =
      ManageFiles.firstFileInTheAppsCategorySD
    await expect(firstFileInTheAppsCategorySD).toBeDisplayed()
    await expect(firstFileInTheAppsCategorySD).toHaveText("app.apk")

    //remove ALL files
    const checkboxFirstFileAppsSD = ManageFiles.checkboxFirstFileAppsSD
    await checkboxFirstFileAppsSD.click() //select first file
    const checkboxAllFilesAppsSD = ManageFiles.checkboxAllFilesAppsSD
    await expect(checkboxAllFilesAppsSD).toBeDisplayed()
    await checkboxAllFilesAppsSD.click() //select all files

    //click delete file button
    const firstFileInTheAppsCategoryDeleteButtonSD =
      ManageFiles.firstFileInTheAppsCategoryDeleteButtonSD
    await expect(firstFileInTheAppsCategoryDeleteButtonSD).toBeDisplayed()
    await firstFileInTheAppsCategoryDeleteButtonSD.click()

    //check delete file modal
    const firstFileInTheAppsCategoryDeleteModalSD =
      ManageFiles.firstFileInTheAppsCategoryDeleteModalSD
    await expect(firstFileInTheAppsCategoryDeleteModalSD).toBeDisplayed()

    const iconExclamation = ManageFiles.iconExclamation
    await expect(iconExclamation).toBeDisplayed()

    //cancel deletion
    const firstFileInTheAppsCategoryDeleteModalCancelButtonSD =
      ManageFiles.firstFileInTheAppsCategoryDeleteModalCancelButtonSD
    await expect(
      firstFileInTheAppsCategoryDeleteModalCancelButtonSD
    ).toBeDisplayed()
    await firstFileInTheAppsCategoryDeleteModalCancelButtonSD.click()

    //click delete file button again
    await firstFileInTheAppsCategoryDeleteButtonSD.click()

    const firstFileInTheAppsCategoryDeleteModalDeleteFileButtonSD =
      ManageFiles.firstFileInTheAppsCategoryDeleteModalDeleteFileButtonSD
    await expect(
      firstFileInTheAppsCategoryDeleteModalDeleteFileButtonSD
    ).toBeDisplayed()
    await firstFileInTheAppsCategoryDeleteModalDeleteFileButtonSD.click()

    // to check after deletion of the file/files

    //check no files available text and subtext
    const appsCategoryEmptyTitleSD = ManageFiles.appsCategoryEmptyTitleSD
    await expect(appsCategoryEmptyTitleSD).toBeDisplayed()
    await expect(appsCategoryEmptyTitleSD).toHaveText(
      "We couldn't find any files"
    )

    const appsCategoryEmptySubtextSD = ManageFiles.appsCategoryEmptySubtextSD
    await expect(appsCategoryEmptySubtextSD).toBeDisplayed()
    await expect(appsCategoryEmptySubtextSD).toHaveText(
      "Add android app (.apk) files and install them from here. As Kompakt is a minimalist E-ink device some apps may not work correctly."
    )
  })
})
