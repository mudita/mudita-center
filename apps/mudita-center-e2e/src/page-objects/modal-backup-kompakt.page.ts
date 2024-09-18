/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { OverviewPage } from "./overview.page"

class ModalBackupPage extends OverviewPage {
  public get backupInfo() {
    return $(`//div[@data-testid="block-box-backup"]//p`)
  }
  public get createBackupButton() {
    return $('//button[@type="button" and .//span[text()="Create backup"]]')
  }
}
export default new ModalBackupPage()
