/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export const ControllerPrefix = "device-log"

export enum IpcDeviceLogEvent {
  GetLog = "get-log",
}

export enum IpcDeviceLogRequest {
  GetLog = "device-log-get-log",
}
