export interface SimCard {
  readonly id: string
  readonly name: string
  readonly network: string
}

export interface MemorySpace {
  readonly free: number
  readonly full: number
}

export interface InitialState {
  readonly simCards: SimCard[]
  readonly batteryLevel: number
  readonly networkName: string
  readonly osVersion: string
  readonly memorySpace: MemorySpace
  readonly lastBackup: string
  readonly loadData: () => void
}
