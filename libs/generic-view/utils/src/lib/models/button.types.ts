/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export type ModalAction =
  | {
      type: "open-modal" | "close-modal" | "replace-modal"
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

export type ButtonAction = ModalAction | NavigateAction
