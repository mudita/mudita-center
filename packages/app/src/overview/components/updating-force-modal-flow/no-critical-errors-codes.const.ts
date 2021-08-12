/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  DeviceUpdateError as PureDeviceUpdateError,
  deviceUpdateErrorCodeMap as pureDeviceUpdateErrorCodeMap,
} from "@mudita/pure"
import {
  DeviceUpdateError,
  deviceUpdateErrorCodeMap,
} from "Backend/adapters/pure-phone/pure-phone.adapter"

export enum ApplicationUpdateError {
  UnableReadOSVersion = "UnableReadOSVersion",
  FetchReleaseFromGithub = "FetchReleaseFromGithub",
  DownloadOS = "DownloadOS",
}

export const ApplicationUpdateErrorCodeMap: Record<
  ApplicationUpdateError,
  number
> = {
  [ApplicationUpdateError.UnableReadOSVersion]: 9800,
  [ApplicationUpdateError.FetchReleaseFromGithub]: 9801,
  [ApplicationUpdateError.DownloadOS]: 9802,
}

export const errorCodeMap = {
  ...pureDeviceUpdateErrorCodeMap,
  ...deviceUpdateErrorCodeMap,
  ...ApplicationUpdateErrorCodeMap,
}

export const noCriticalErrorCodes: number[] = [
  errorCodeMap[PureDeviceUpdateError.VerifyChecksumsFailure],
  errorCodeMap[PureDeviceUpdateError.VerifyVersionFailure],
  errorCodeMap[PureDeviceUpdateError.CantOpenUpdateFile],
  errorCodeMap[PureDeviceUpdateError.NoBootloaderFile],
  errorCodeMap[PureDeviceUpdateError.CantOpenBootloaderFile],
  errorCodeMap[DeviceUpdateError.RestartTimedOut],
  errorCodeMap[DeviceUpdateError.DeviceDisconnectionBeforeDone],
  errorCodeMap[ApplicationUpdateError.UnableReadOSVersion],
  errorCodeMap[ApplicationUpdateError.FetchReleaseFromGithub],
  errorCodeMap[ApplicationUpdateError.DownloadOS],
]
