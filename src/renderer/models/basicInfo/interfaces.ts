export interface SimCard {
  id: string
  name: string
  network: string
}

export interface MemorySpace {
  free: number
  full: number
}

export interface InitialState {
  simCards: SimCard[]
  batteryLevel: number
  networkName: string
  osVersion: string
  memorySpace: MemorySpace
  lastBackup: string
}
