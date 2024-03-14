/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Subview, ViewGenerator } from "generic-view/utils"
import { BackupTileConfig } from "device/models"

export enum BackupRestoreModalsKeys {
  Domain = "restore",
  Restore = "backup-restore",
  RestoreContent = "backup-restore-content",
}

export const generateBackupRestoreModalLayout: ViewGenerator<
  BackupTileConfig,
  Subview
> = (config) => {
  return {
    [config.dataKey + BackupRestoreModalsKeys.Restore]: {
      component: "modal",
      config: {
        variant: "small",
      },
      childrenKeys: [config.dataKey + BackupRestoreModalsKeys.RestoreContent],
    },
    [config.dataKey + BackupRestoreModalsKeys.RestoreContent]: {
      component: "backup-restore",
      config: {
        features: config.restoreFeatures,
        modalKey: config.dataKey + BackupRestoreModalsKeys.Restore,
      },
    },
  }
}
