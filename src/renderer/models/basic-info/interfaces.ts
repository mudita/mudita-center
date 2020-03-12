import { PhoneUpdate } from "Renderer/models/phone-update/phone-update.interface"

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

export interface StoreValues extends PhoneUpdate {
  readonly batteryLevel: number
  readonly networkName: string
  readonly osVersion: string
  readonly osUpdateDate: number
  readonly memorySpace: MemorySpace
  readonly lastBackup: string
  readonly simCards: SimCard[]
}

interface StoreEffects {
  readonly changeSim: (card: SimCard) => void
  readonly loadData: () => void
  readonly disconnectDevice: () => void
  readonly updatePhoneOsInfo: (updateInfo: PhoneUpdate) => void
}

export type Store = StoreValues & StoreEffects
