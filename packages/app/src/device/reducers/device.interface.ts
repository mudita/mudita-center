/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  CaseColour,
  DeviceType,
  GetPhoneLockTimeResponseBody,
} from "@mudita/pure"
import { PayloadAction } from "@reduxjs/toolkit"
import { DeviceEvent } from "App/device/constants"
import { SimCard } from "Renderer/models/basic-info/basic-info.typings"
import { UpdatingState, ConnectionState } from "App/device/constants"
import {
  DeviceConnectionError,
  DeviceDisconnectionError,
  DeviceLoadingError,
  DeviceInvalidPhoneLockTimeError,
  DeviceUpdateProcessError,
} from "App/device/errors"

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
    free: number
    full: number
    total: number
  }
  caseColour: CaseColour
  backupLocation: string
}

export interface HarmonyDeviceData {
  osVersion: string
  batteryLevel: number
  serialNumber: string
  memorySpace: {
    free: number
    full: number
  }
}

export interface DeviceState {
  deviceType: DeviceType | null
  data: Partial<PureDeviceData | HarmonyDeviceData> | null
  state: ConnectionState
  status: {
    connected: boolean
    unlocked: boolean | null
    loaded: boolean
  }
  updatingState: UpdatingState | null
  error: Error | string | null
}

export interface OsVersionPayload {
  osVersion: string
}

export type ConnectedFulfilledAction = PayloadAction<
  DeviceType,
  DeviceEvent.Connected
>
export type ConnectedRejectedAction = PayloadAction<
  DeviceConnectionError,
  DeviceEvent.Connected
>
export type DisconnectedRejectedAction = PayloadAction<
  DeviceDisconnectionError,
  DeviceEvent.Disconnected
>
export type SetDeviceDataAction = PayloadAction<
  PureDeviceData | HarmonyDeviceData,
  DeviceEvent.SetData
>
export type LoadDataRejectAction = PayloadAction<
  DeviceLoadingError,
  DeviceEvent.Loading
>
export type SetPhoneLockTimeAction = PayloadAction<
  GetPhoneLockTimeResponseBody,
  DeviceEvent.SetLockTime
>
export type UnlockDeviceRejectedAction = PayloadAction<
  DeviceConnectionError | DeviceInvalidPhoneLockTimeError,
  DeviceEvent.Unlocked
>
export type SetSimDataAction = PayloadAction<number, DeviceEvent.SetSimData>
export type SetOsVersionDataAction = PayloadAction<
  OsVersionPayload,
  DeviceEvent.SetOsVersionData
>
export type SetUpdateStateAction = PayloadAction<
  UpdatingState,
  DeviceEvent.SetUpdateState
>
export type OsUpdateRejectedAction = PayloadAction<
  DeviceUpdateProcessError,
  DeviceEvent.StartOsUpdateProcess
>
export type SetConnectionStateAction = PayloadAction<
  boolean,
  DeviceEvent.SetConnectionState
>
