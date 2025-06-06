/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { OverviewPage } from "./overview.page"

class ManageFiles extends OverviewPage {
  public get phoneStorageButton() {
    return $('//a[p[text()="Phone storage"]]')
  }

  public get sdCardButton() {
    return $('//a[p[text()="SD card"]]')
  }

  public get phoneStorageHeader() {
    return $(
      '[data-testid="ui-typography-h3-mcFileManagerInternalstorageSummaryHeader"]'
    )
  }

  public get sdCardHeader() {
    return $(
      '[data-testid="ui-typography-h3-mcFileManagerExternalstorageSummaryHeader"]'
    )
  }

  public get iconExclamation() {
    return $('[data-testid="icon-exclamation"]')
  }

  public get musicCategoryHeader() {
    return $(
      '[data-testid="ui-typography-h3-mcFileManagerInternal0fileListPanelHeaderWrapper"]'
    )
  }

  public get musicCategoryAddFilesButton() {
    return $(
      '[data-testid="primary-button-mcFileManagerInternal0filesUploadButton"]'
    )
  }

  public get firstFileInTheMusicCategory() {
    return $(
      '[data-testid="ui-typography-p1-mcFileManagerInternal0columnNameText"]'
    )
  }

  public get firstFileInTheMusicCategoryDeleteButton() {
    return $('[data-testid="button-text_mcFileManagerInternal0deleteButton"]')
  }

  public get firstFileInTheMusicCategoryDeleteModal() {
    return $('[data-testid="modal-content-mcFileManagerInternal0deleteModal"]')
  }

  public get firstFileInTheMusicCategoryDeleteModalCancelButton() {
    return $(
      '[data-testid="primary-button-mcFileManagerInternal0deleteModalCancelButton"]'
    )
  }

  public get firstFileInTheMusicCategoryDeleteModalDeleteFileButton() {
    return $(
      '[data-testid="primary-button-mcFileManagerInternal0deleteModalConfirmButton"]'
    )
  }

  public get musicCategoryEmptyTitle() {
    return $(
      '[data-testid="ui-typography-h4-mcFileManagerInternal0fileListEmptyStateHeader"]'
    )
  }

  public get musicCategoryEmptySubtext() {
    return $(
      '[data-testid="ui-typography-p3-mcFileManagerInternal0fileListEmptyStateDescription"]'
    )
  }

  public get photosCategoryButton() {
    return $(
      '[data-testid="ui-typography-h4-mcFileManagerInternal1categoryListItemNameText"]'
    )
  }

  public get photosCategoryHeader() {
    return $(
      '[data-testid="ui-typography-h3-mcFileManagerInternal1fileListPanelHeaderWrapper"]'
    )
  }

  public get photosCategoryAddFilesButton() {
    return $(
      '[data-testid="primary-button-mcFileManagerInternal1filesUploadButton"]'
    )
  }

  public get firstFileInThePhotosCategory() {
    return $(
      '[data-testid="ui-typography-p1-mcFileManagerInternal1columnNameText"]'
    )
  }

  public get firstFileInThePhotosCategoryDeleteButton() {
    return $('[data-testid="button-text_mcFileManagerInternal1deleteButton"]')
  }

  public get firstFileInThePhotosCategoryDeleteModal() {
    return $('[data-testid="modal-content-mcFileManagerInternal1deleteModal"]')
  }

  public get firstFileInThePhotosCategoryDeleteModalCancelButton() {
    return $(
      '[data-testid="primary-button-mcFileManagerInternal1deleteModalCancelButton"]'
    )
  }

  public get firstFileInThePhotosCategoryDeleteModalDeleteFileButton() {
    return $(
      '[data-testid="primary-button-mcFileManagerInternal1deleteModalConfirmButton"]'
    )
  }

  public get photosCategoryEmptyTitle() {
    return $(
      '[data-testid="ui-typography-h4-mcFileManagerInternal1fileListEmptyStateHeader"]'
    )
  }

  public get photosCategoryEmptySubtext() {
    return $(
      '[data-testid="ui-typography-p3-mcFileManagerInternal1fileListEmptyStateDescription"]'
    )
  }

  public get ebooksCategoryButton() {
    return $(
      '[data-testid="ui-typography-h4-mcFileManagerInternal2categoryListItemNameText"]'
    )
  }

  public get ebooksCategoryHeader() {
    return $(
      '[data-testid="ui-typography-h3-mcFileManagerInternal2fileListPanelHeaderWrapper"]'
    )
  }

  public get ebooksCategoryAddFilesButton() {
    return $(
      '[data-testid="primary-button-mcFileManagerInternal2filesUploadButton"]'
    )
  }

  public get firstFileInTheEbooksCategory() {
    return $(
      '[data-testid="ui-typography-p1-mcFileManagerInternal2columnNameText"]'
    )
  }

  public get firstFileInTheEbooksCategoryDeleteButton() {
    return $('[data-testid="button-text_mcFileManagerInternal2deleteButton"]')
  }

  public get firstFileInTheEbooksCategoryDeleteModal() {
    return $('[data-testid="modal-content-mcFileManagerInternal2deleteModal"]')
  }

  public get firstFileInTheEbooksCategoryDeleteModalCancelButton() {
    return $(
      '[data-testid="primary-button-mcFileManagerInternal2deleteModalCancelButton"]'
    )
  }

  public get firstFileInTheEbooksCategoryDeleteModalDeleteFileButton() {
    return $(
      '[data-testid="primary-button-mcFileManagerInternal2deleteModalConfirmButton"]'
    )
  }

  public get ebooksCategoryEmptyTitle() {
    return $(
      '[data-testid="ui-typography-h4-mcFileManagerInternal2fileListEmptyStateHeader"]'
    )
  }

  public get ebooksCategoryEmptySubtext() {
    return $(
      '[data-testid="ui-typography-p3-mcFileManagerInternal2fileListEmptyStateDescription"]'
    )
  }

  public get appsCategoryButton() {
    return $(
      '[data-testid="ui-typography-h4-mcFileManagerInternal3categoryListItemNameText"]'
    )
  }

  public get appsCategoryHeader() {
    return $(
      '[data-testid="ui-typography-h3-mcFileManagerInternal3fileListPanelHeaderWrapper"]'
    )
  }

  public get appsCategoryAddFilesButton() {
    return $(
      '[data-testid="primary-button-mcFileManagerInternal3filesUploadButton"]'
    )
  }

  public get firstFileInTheAppsCategory() {
    return $(
      '[data-testid="ui-typography-p1-mcFileManagerInternal3columnNameText"]'
    )
  }

  public get firstFileInTheAppsCategoryDeleteButton() {
    return $('[data-testid="button-text_mcFileManagerInternal3deleteButton"]')
  }

  public get firstFileInTheAppsCategoryDeleteModal() {
    return $('[data-testid="modal-content-mcFileManagerInternal3deleteModal"]')
  }

  public get firstFileInTheAppsCategoryDeleteModalCancelButton() {
    return $(
      '[data-testid="primary-button-mcFileManagerInternal3deleteModalCancelButton"]'
    )
  }

  public get firstFileInTheAppsCategoryDeleteModalDeleteFileButton() {
    return $(
      '[data-testid="primary-button-mcFileManagerInternal3deleteModalConfirmButton"]'
    )
  }

  public get appsCategoryEmptyTitle() {
    return $(
      '[data-testid="ui-typography-h4-mcFileManagerInternal3fileListEmptyStateHeader"]'
    )
  }

  public get appsCategoryEmptySubtext() {
    return $(
      '[data-testid="ui-typography-p3-mcFileManagerInternal3fileListEmptyStateDescription"]'
    )
  }

  public get musicCategoryHeaderSD() {
    return $(
      '[data-testid="ui-typography-h3-mcFileManagerExternal0fileListPanelHeaderWrapper"]'
    )
  }

  public get musicCategoryAddFilesButtonSD() {
    return $(
      '[data-testid="primary-button-mcFileManagerExternal0filesUploadButton"]'
    )
  }

  public get firstFileInTheMusicCategorySD() {
    return $(
      '[data-testid="ui-typography-p1-mcFileManagerExternal0columnNameText"]'
    )
  }

  public get firstFileInTheMusicCategoryDeleteButtonSD() {
    return $("button*=Delete")
  }

  public get firstFileInTheMusicCategoryDeleteModalSD() {
    return $('[data-testid="modal-content-mcFileManagerExternal0deleteModal"]')
  }

  public get firstFileInTheMusicCategoryDeleteModalCancelButtonSD() {
    return $(
      '[data-testid="primary-button-mcFileManagerExternal0deleteModalCancelButton"]'
    )
  }

  public get firstFileInTheMusicCategoryDeleteModalDeleteFileButtonSD() {
    return $(
      '[data-testid="primary-button-mcFileManagerExternal0deleteModalConfirmButton"]'
    )
  }

  public get musicCategoryEmptyTitleSD() {
    return $(
      '[data-testid="ui-typography-h4-mcFileManagerExternal0fileListEmptyStateHeader"]'
    )
  }

  public get musicCategoryEmptySubtextSD() {
    return $(
      '[data-testid="ui-typography-p3-mcFileManagerExternal0fileListEmptyStateDescription"]'
    )
  }

  public get photosCategoryButtonSD() {
    return $(
      '[data-testid="ui-typography-h4-mcFileManagerExternal1categoryListItemNameText"]'
    )
  }

  public get photosCategoryHeaderSD() {
    return $(
      '[data-testid="ui-typography-h3-mcFileManagerExternal1fileListPanelHeaderWrapper"]'
    )
  }

  public get photosCategoryAddFilesButtonSD() {
    return $(
      '[data-testid="primary-button-mcFileManagerExternal1filesUploadButton"]'
    )
  }

  public get firstFileInThePhotosCategorySD() {
    return $(
      '[data-testid="ui-typography-p1-mcFileManagerExternal1columnNameText"]'
    )
  }

  public get firstFileInThePhotosCategoryDeleteButtonSD() {
    return $("button*=Delete")
  }

  public get firstFileInThePhotosCategoryDeleteModalSD() {
    return $('[data-testid="modal-content-mcFileManagerExternal1deleteModal"]')
  }

  public get firstFileInThePhotosCategoryDeleteModalCancelButtonSD() {
    return $(
      '[data-testid="primary-button-mcFileManagerExternal1deleteModalCancelButton"]'
    )
  }

  public get firstFileInThePhotosCategoryDeleteModalDeleteFileButtonSD() {
    return $(
      '[data-testid="primary-button-mcFileManagerExternal1deleteModalConfirmButton"]'
    )
  }

  public get photosCategoryEmptyTitleSD() {
    return $(
      '[data-testid="ui-typography-h4-mcFileManagerExternal1fileListEmptyStateHeader"]'
    )
  }

  public get photosCategoryEmptySubtextSD() {
    return $(
      '[data-testid="ui-typography-p3-mcFileManagerExternal1fileListEmptyStateDescription"]'
    )
  }

  public get ebooksCategoryButtonSD() {
    return $(
      '[data-testid="ui-typography-h4-mcFileManagerExternal2categoryListItemNameText"]'
    )
  }

  public get ebooksCategoryHeaderSD() {
    return $(
      '[data-testid="ui-typography-h3-mcFileManagerExternal2fileListPanelHeaderWrapper"]'
    )
  }

  public get ebooksCategoryAddFilesButtonSD() {
    return $(
      '[data-testid="primary-button-mcFileManagerExternal2filesUploadButton"]'
    )
  }

  public get firstFileInTheEbooksCategorySD() {
    return $(
      '[data-testid="ui-typography-p1-mcFileManagerExternal2columnNameText"]'
    )
  }

  public get firstFileInTheEbooksCategoryDeleteButtonSD() {
    return $("button*=Delete")
  }

  public get firstFileInTheEbooksCategoryDeleteModalSD() {
    return $('[data-testid="modal-content-mcFileManagerExternal2deleteModal"]')
  }

  public get firstFileInTheEbooksCategoryDeleteModalCancelButtonSD() {
    return $(
      '[data-testid="primary-button-mcFileManagerExternal2deleteModalCancelButton"]'
    )
  }

  public get firstFileInTheEbooksCategoryDeleteModalDeleteFileButtonSD() {
    return $(
      '[data-testid="primary-button-mcFileManagerExternal2deleteModalConfirmButton"]'
    )
  }

  public get ebooksCategoryEmptyTitleSD() {
    return $(
      '[data-testid="ui-typography-h4-mcFileManagerExternal2fileListEmptyStateHeader"]'
    )
  }

  public get ebooksCategoryEmptySubtextSD() {
    return $(
      '[data-testid="ui-typography-p3-mcFileManagerExternal2fileListEmptyStateDescription"]'
    )
  }

  public get appsCategoryButtonSD() {
    return $(
      '[data-testid="ui-typography-h4-mcFileManagerExternal3categoryListItemNameText"]'
    )
  }

  public get appsCategoryHeaderSD() {
    return $(
      '[data-testid="ui-typography-h3-mcFileManagerExternal3fileListPanelHeaderWrapper"]'
    )
  }

  public get appsCategoryAddFilesButtonSD() {
    return $(
      '[data-testid="primary-button-mcFileManagerExternal3filesUploadButton"]'
    )
  }

  public get firstFileInTheAppsCategorySD() {
    return $(
      '[data-testid="ui-typography-p1-mcFileManagerExternal3columnNameText"]'
    )
  }

  public get firstFileInTheAppsCategoryDeleteButtonSD() {
    return $("button*=Delete")
  }

  public get firstFileInTheAppsCategoryDeleteModalSD() {
    return $('[data-testid="modal-content-mcFileManagerExternal3deleteModal"]')
  }

  public get firstFileInTheAppsCategoryDeleteModalCancelButtonSD() {
    return $(
      '[data-testid="primary-button-mcFileManagerExternal3deleteModalCancelButton"]'
    )
  }

  public get firstFileInTheAppsCategoryDeleteModalDeleteFileButtonSD() {
    return $(
      '[data-testid="primary-button-mcFileManagerExternal3deleteModalConfirmButton"]'
    )
  }

  public get appsCategoryEmptyTitleSD() {
    return $(
      '[data-testid="ui-typography-h4-mcFileManagerExternal3fileListEmptyStateHeader"]'
    )
  }

  public get appsCategoryEmptySubtextSD() {
    return $(
      '[data-testid="ui-typography-p3-mcFileManagerExternal3fileListEmptyStateDescription"]'
    )
  }

  public get checkboxFile() {
    return $('label[for^="checkbox-"]')
  }

  public get checkboxAllFiles() {
    return $('[data-testid=""]')
  }
}
export default new ManageFiles()
