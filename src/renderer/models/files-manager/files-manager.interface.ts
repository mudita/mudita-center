import { Type } from "Renderer/components/core/icon/icon.config"

export interface DiskSpaceCategory {
  filesType: string
  occupiedMemory: number
  filesAmount?: number
  color: string
  icon: Type
  url?: string
  free?: boolean
}

export interface FilesManagerState {
  memoryData: DiskSpaceCategory[]
}
