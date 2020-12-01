import BackupItemInfo from "Common/interfaces/backup-item-info.interface"

export interface SimCard {
  readonly network?: string
  readonly number: number
  readonly slot: 1 | 2
  readonly active: boolean
}

export interface MemorySpace {
  readonly free: number
  readonly full: number
}

export interface StoreValues {
  readonly disconnectedDevice?: boolean
  readonly batteryLevel: number
  readonly networkName: string
  readonly osVersion: string
  readonly osUpdateDate: string
  readonly memorySpace: MemorySpace
  readonly lastBackup: BackupItemInfo
  readonly simCards: SimCard[]
}

export enum ResultsState {
  Loading,
  Loaded,
  Empty,
  Error,
}

export interface StoreData extends StoreValues {
  resultsState: ResultsState
}

interface StoreEffects {
  readonly changeSim: (card: SimCard) => void
  readonly loadData: () => void
  readonly disconnectDevice: () => void
}

export type Store = StoreValues & StoreEffects
