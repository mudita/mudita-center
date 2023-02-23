/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export enum DeviceError {
  Initialization = "DEVICE_INITIALIZATION_ERROR",
  DataReceiving = "DEVICE_DATA_RECEIVING_ERROR",
  ConnectionDoesntEstablished = "DEVICE_CONNECTION_DOESNT_ESTABLISHED_ERROR",
  TimeOut = "DEVICE_RESPONSE_TIMEOUT_ERROR",
  RequestFailed = "DEVICE_RESPONDED_WITH_ERROR",
  Disconnection = "DEVICE_DISCONNECTION_ERROR",
}
