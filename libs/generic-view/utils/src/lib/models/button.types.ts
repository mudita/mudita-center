/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

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

export type FormAction =
  | {
      type: "form-set-field"
      key: string
      value?: string | number | boolean
    }
  | {
      type: "form-toggle-field"
      key: string
    }
  | {
      type: "form-reset"
    }

export interface CustomAction {
  type: "custom"
  callback: VoidFunction
}

export type ButtonAction =
  | ModalAction
  | NavigateAction
  | FormAction
  | CustomAction
