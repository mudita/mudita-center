/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { GetPhoneLockTimeResponseBody } from "App/device/types/mudita-os"
import { CaseColor, DeviceType } from "App/device/constants"
import { PayloadAction } from "@reduxjs/toolkit"
import { DeviceError, DeviceEvent } from "App/device/constants"
import { SimCard } from "App/__deprecated__/renderer/models/basic-info/basic-info.typings"
import { ConnectionState } from "App/device/constants"
import { AppError } from "App/core/errors"
import StorageInfo from "App/__deprecated__/common/interfaces/storage-info.interface"

export interface KompaktDeviceData {
  networkName: string
  networkLevel: string
  osVersion: string
  batteryLevel: number
  simCards: SimCard[]
  serialNumber: string
  memorySpace: {
    reservedSpace: number
    usedUserSpace: number
    total: number
  }
  caseColour: CaseColor
}

export interface PureDeviceData {
  networkName: string
  networkLevel: string
  osVersion: string
  batteryLevel: number
  simCards: SimCard[]
  serialNumber: string
  phoneLockTime?: number
  timeLeftToNextAttempt?: number
  memorySpace: {
    reservedSpace: number
    usedUserSpace: number
    total: number
  }
  caseColour: CaseColor
  backupFilePath: string
}

export interface HarmonyDeviceData {
  osVersion: string
  batteryLevel: number
  serialNumber: string
  memorySpace: {
    reservedSpace: number
    usedUserSpace: number
    total: number
  }
}

export interface DeviceState {
  deviceType: DeviceType | null
  data: Partial<PureDeviceData | HarmonyDeviceData | KompaktDeviceData> | null
  state: ConnectionState
  status: {
    connecting: boolean
    connected: boolean
    unlocked: boolean | null
    loaded: boolean
    onboardingFinished: boolean
    criticalBatteryLevel: boolean
    restarting: boolean
  }
  error: Error | string | null
  externalUsageDevice: boolean | null
}

export interface OsVersionPayload {
  osVersion: string
}

export type ConnectedFulfilledAction = PayloadAction<
  DeviceType,
  DeviceEvent.Connected
>
export type ConnectedRejectedAction = PayloadAction<
  AppError<DeviceError.Connection>,
  DeviceEvent.Connected
>
export type DisconnectedRejectedAction = PayloadAction<
  AppError<DeviceError.Disconnection>,
  DeviceEvent.Disconnected
>
export type SetDeviceDataAction = PayloadAction<
  PureDeviceData | HarmonyDeviceData,
  DeviceEvent.SetData
>
export type LoadDataRejectAction = PayloadAction<
  AppError<DeviceError.Loading>,
  DeviceEvent.Loading
>
export type SetPhoneLockTimeAction = PayloadAction<
  GetPhoneLockTimeResponseBody,
  DeviceEvent.SetLockTime
>
export type SetSimDataAction = PayloadAction<number, DeviceEvent.SetSimData>
export type SetOsVersionDataAction = PayloadAction<
  OsVersionPayload,
  DeviceEvent.SetOsVersionData
>
export type SetConnectionStateAction = PayloadAction<
  boolean,
  DeviceEvent.SetConnectionState
>
export type LoadStorageInfoAction = PayloadAction<
  StorageInfo,
  DeviceEvent.LoadStorageInfo
>
export type LoadStorageInfoRejectedAction = PayloadAction<
  AppError<DeviceError.LoadStorageInfo>,
  DeviceEvent.LoadStorageInfo
>
