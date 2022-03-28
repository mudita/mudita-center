/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export const ControllerPrefix = "app-settings"

export enum IpcAppSettingsEvent {
  Get = "get",
  Reset = "reset",
  Update = "update",
}

export enum IpcAppSettingsRequest {
  Get = "app-settings-get",
  Reset = "app-settings-reset",
  Update = "app-settings-update",
}
