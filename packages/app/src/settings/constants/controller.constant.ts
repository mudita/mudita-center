/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export const ControllerPrefix = "settings"

export enum IpcAppSettingsEvent {
  Get = "get",
  Reset = "reset",
  Update = "update",
}

export enum IpcAppSettingsRequest {
  Get = "settings-get",
  Reset = "settings-reset",
  Update = "settings-update",
}
