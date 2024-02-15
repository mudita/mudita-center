/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { BackupTileConfig } from "device/models"
import { Subview, ViewGenerator } from "generic-view/utils"

enum BackupKeys {

}

export const generateMcOverviewBackupLayout: ViewGenerator<
  BackupTileConfig,
  Subview
> = (config) => {
  return {
    [config.dataKey]: {}
  }
}
