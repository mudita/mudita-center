/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

type BackupFeature = {
  label: string
  key: string
}

export type BackupAction =
  | {
      type: "backup-data"
      features: BackupFeature[]
    }
  | {
      type: "restore-data"
      features: (BackupFeature & { supportedKeys: string[] })[]
    }

export type ModalAction =
  | {
      type: "open-modal" | "replace-modal"
      domain?: string
      modalKey: string
      permanent?: boolean
    }
  | {
      type: "close-modal"
      domain?: string
      modalKey: string
    }
  | {
      type: "close-domain-modals"
      domain: string
    }
  | {
      type: "close-all-modals"
    }

export interface NavigateAction {
  type: "navigate"
  viewKey: string
}

export type ButtonAction = ModalAction | NavigateAction | BackupAction
