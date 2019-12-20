export interface FilesManagerData {
  filesType: string
  occupiedMemory: number
  filesAmount: number
  color: string
}

export interface FilesManagerState {
  memoryData: FilesManagerData[]
}
