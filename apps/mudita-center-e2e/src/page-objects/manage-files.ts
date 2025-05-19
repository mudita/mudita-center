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
}
export default new ManageFiles()
