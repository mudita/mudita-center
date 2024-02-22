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
  CreateCancelButton = "backup-create-cancel-button",
  CreateSubmitButton = "backup-create-submit-button",
  Password = "backup-password",
  PasswordContent = "backup-password-content",
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
        closeButtonAction: {
          type: "close-domain-modals",
          domain: BackupModalsKeys.Domain,
        },
      },
      childrenKeys: [config.dataKey + BackupModalsKeys.CreateContent],
    },
    [config.dataKey + BackupModalsKeys.CreateContent]: {
      component: "backup-create",
      childrenKeys: [
        config.dataKey + BackupModalsKeys.CreateCancelButton,
        config.dataKey + BackupModalsKeys.CreateSubmitButton,
      ],
    },
    [config.dataKey + BackupModalsKeys.CreateCancelButton]: {
      component: "button-secondary",
      config: {
        text: "Cancel",
        action: {
          type: "close-domain-modals",
          domain: BackupModalsKeys.Domain,
        },
      },
    },
    [config.dataKey + BackupModalsKeys.CreateSubmitButton]: {
      component: "button-primary",
      config: {
        text: "Create",
        action: {
          type: "open-modal",
          modalKey: config.dataKey + BackupModalsKeys.Password,
          domain: BackupModalsKeys.Domain,
        },
      },
    },
    [config.dataKey + BackupModalsKeys.Password]: {
      component: "modal",
      config: {
        variant: "small",
        closeButtonAction: {
          type: "close-domain-modals",
          domain: BackupModalsKeys.Domain,
        },
      },
      childrenKeys: [config.dataKey + BackupModalsKeys.PasswordContent],
    },
    [config.dataKey + BackupModalsKeys.PasswordContent]: {
      component: "backup-create-password",
      config: {
        variant: "small",
        closeButtonAction: {
          type: "close-domain-modals",
          domain: BackupModalsKeys.Domain,
        },
      },
    },
  }
}
