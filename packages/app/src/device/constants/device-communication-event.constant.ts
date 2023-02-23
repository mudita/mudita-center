/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export enum DeviceCommunicationEvent {
  Connected = "device-connected",
  Disconnected = "device-disconnected",
  DataReceived = "device-data-received",
  InitializationFailed = "device-connection-failed",
}
