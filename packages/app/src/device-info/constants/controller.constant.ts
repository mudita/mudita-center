/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export const ControllerPrefix = "device-info"

export enum IpcDeviceInfoEvent {
  GetDeviceInfo = "get-device-info",
}

export enum IpcDeviceInfoRequest {
  GetDeviceInfo = "device-info-get-device-info",
}
