/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceType } from "@mudita/pure"
import { PayloadAction } from "@reduxjs/toolkit"
import { DeviceEvent } from "App/device/constants"
import { SimCard } from "Renderer/models/basic-info/basic-info.typings"
import BackupItemInfo from "Common/interfaces/backup-item-info.interface"
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
  osUpdateDate?: string
  osVersion: string
  batteryLevel: number
  simCards: SimCard[]
  lastBackup: BackupItemInfo
  serialNumber: string
  phoneLockTime: number
  memorySpace: {
    free: number
    full: number
  }
}

export interface HarmonyDeviceData {
  osUpdateDate?: string
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
    locked: boolean
    loaded: boolean
  }
  updatingState: UpdatingState | null
  error: Error | string | null
}

export interface OsVersionPayload {
  osVersion: string
  osUpdateDate: string
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
  number,
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
