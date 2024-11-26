/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { intl } from "Core/__deprecated__/renderer/utils/intl"
import { BackupTileConfig } from "device/models"
import { Subview, ViewGenerator } from "generic-view/utils"
import {
  BackupModalsKeys,
  generateBackupCreateModalLayout,
} from "./backup-create-modal"
import {
  BackupRestoreModalsKeys,
  generateBackupRestoreModalLayout,
} from "./backup-restore-modal"

enum BackupKeys {
  BackupInfo = "backup-info",
  LastBackup = "last-backup",
  BackupActions = "backup-actions",
  RestoreBackupWrapper = "restore-backup-wrapper",
  RestoreBackupButton = "restore-backup-button",
  CreateBackupButton = "create-backup-button",
}

export const generateMcOverviewBackupLayout: ViewGenerator<
  BackupTileConfig,
  Subview
> = (config) => {
  const mainKey = config.dataKey
  return {
    [mainKey]: {
      component: "block-box",
      config: {
        title: "Backup",
      },
      layout: {
        gridPlacement: {
          row: 3,
          column: 2,
          width: 1,
          height: 1,
        },
        flexLayout: {
          direction: "column",
          justifyContent: "space-between",
        },
      },
      childrenKeys: [mainKey + BackupKeys.BackupInfo],
    },
    [mainKey + BackupKeys.BackupInfo]: {
      component: "block-plain",
      layout: {
        flexLayout: {
          direction: "row",
          alignItems: "center",
          columnGap: "12px",
          justifyContent: "space-between",
        },
      },
      childrenKeys: [
        mainKey + BackupKeys.LastBackup,
        mainKey + BackupKeys.BackupActions,
      ],
    },
    [mainKey + BackupKeys.LastBackup]: {
      component: "last-backup-date",
    },
    [mainKey + BackupKeys.BackupActions]: {
      component: "block-plain",
      layout: {
        gridLayout: {
          rows: ["auto"],
          columns: ["repeat(auto-fit, 164px)"],
          columnGap: "14px",
          justifyContent: "end",
        },
        flexPlacement: {
          grow: 1,
        },
      },
      childrenKeys: [
        config.restoreFeatures ? mainKey + BackupKeys.RestoreBackupWrapper : "",
        config.backupFeatures ? mainKey + BackupKeys.CreateBackupButton : "",
      ].filter(Boolean) as string[],
    },
    ...(config.restoreFeatures
      ? {
          [mainKey + BackupKeys.RestoreBackupWrapper]: {
            component: "backup-restore-available",
            childrenKeys: [mainKey + BackupKeys.RestoreBackupButton],
          },
          [mainKey + BackupKeys.RestoreBackupButton]: {
            component: "button-secondary",
            config: {
              text: intl.formatMessage({
                id: "module.genericBackup.restoreButtonLabel",
              }),
              actions: [
                {
                  type: "open-modal",
                  modalKey: config.dataKey + BackupRestoreModalsKeys.Restore,
                  domain: BackupRestoreModalsKeys.Domain,
                },
              ],
            },
          },
          ...generateBackupRestoreModalLayout({
            dataKey: config.dataKey,
            restoreFeatures: config.restoreFeatures,
          }),
        }
      : {}),
    ...(config.backupFeatures
      ? {
          [mainKey + BackupKeys.CreateBackupButton]: {
            component: "button-primary",
            config: {
              text: intl.formatMessage({
                id: "module.genericBackup.createButtonLabel",
              }),
              actions: [
                {
                  type: "open-modal",
                  modalKey: config.dataKey + BackupModalsKeys.Create,
                  domain: BackupModalsKeys.Domain,
                },
              ],
            },
          },
          ...generateBackupCreateModalLayout({
            dataKey: config.dataKey,
            backupFeatures: config.backupFeatures,
          }),
        }
      : {}),
  }
}
