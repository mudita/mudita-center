/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Subview, ViewGenerator } from "generic-view/utils"
import { BackupTileConfig } from "device/models"

export enum BackupModalsKeys {
  Domain = "backup",
  Create = "backup-create",
  CreateContent = "backup-create-content",
}

export const generateBackupCreateModalLayout: ViewGenerator<
  BackupTileConfig,
  Subview
> = (config) => {
  return {
    [config.dataKey + BackupModalsKeys.Create]: {
      component: "modal",
      config: {
        variant: "small",
      },
      childrenKeys: [config.dataKey + BackupModalsKeys.CreateContent],
    },
    [config.dataKey + BackupModalsKeys.CreateContent]: {
      component: "backup-create",
      config: {
        features: config.backupFeatures,
        modalKey: config.dataKey + BackupModalsKeys.Create,
      },
    },
  }
}
