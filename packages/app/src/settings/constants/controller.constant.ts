/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export const SettingsControllerPrefix = "settings"
export const ConfigurationsControllerPrefix = "configurations"

export enum IpcSettingsEvent {
  Get = "get",
  Reset = "reset",
  Update = "update",
}

export enum IpcConfigurationsEvent {
  Get = "get",
}

export enum IpcSettingsRequest {
  Get = "settings-get",
  Reset = "settings-reset",
  Update = "settings-update",
}

export enum IpcConfigurationsRequest {
  Get = "configurations-get",
}
