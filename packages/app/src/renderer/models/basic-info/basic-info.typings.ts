/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceType } from "@mudita/pure"
import BackupItemInfo from "Common/interfaces/backup-item-info.interface"

export interface SimCard {
  readonly network?: string
  readonly networkLevel: number
  readonly number: number
  readonly slot: 1 | 2
  readonly active: boolean
}

export interface MemorySpace {
  readonly free: number
  readonly full: number
}

export enum DataState {
  Loading,
  Loaded,
  Empty,
  Error,
}

export enum UpdatingState {
  Standby,
  Updating,
  Success,
  Fail,
}

export interface StoreValues {
  readonly deviceType: DeviceType | undefined
  readonly deviceConnected: boolean
  readonly updatingState: UpdatingState
  readonly deviceUnlocked: boolean | undefined
  readonly batteryLevel: number
  readonly networkName: string
  readonly osVersion: string | undefined
  readonly osUpdateDate: string
  readonly memorySpace: MemorySpace
  readonly lastBackup?: BackupItemInfo
  readonly simCards: SimCard[]
  readonly basicInfoDataState: DataState
  readonly initialDataLoaded: boolean
  readonly serialNumber: string | undefined
}

export interface StoreEffects {
  readonly changeSim: (card: SimCard) => void
  readonly loadData: () => void
  readonly disconnectDevice: () => void
}

export type Store = StoreValues & StoreEffects
