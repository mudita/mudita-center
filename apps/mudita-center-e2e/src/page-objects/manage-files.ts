/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { OverviewPage } from "./overview.page"

class ManageFiles extends OverviewPage {
  public get phoneStorageHeader() {
    return $(
      '[data-testid="ui-typography-h3-mcFileManagerInternalstorageSummaryHeader"]'
    )
  }

  public get musicCategoryHeader() {
    return $(
      '[data-testid="ui-typography-h3-mcFileManagerInternal0fileListPanelHeaderWrapper"]'
    )
  }

  public get firstFileInTheCategory() {
    return $(
      '[data-testid="ui-typography-p1-mcFileManagerInternal0columnNameText"]'
    )
  }
}
export default new ManageFiles()
