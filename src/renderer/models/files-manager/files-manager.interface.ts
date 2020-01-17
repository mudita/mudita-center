import { Image as ImageInterface } from "Renderer/interfaces/image.interface"
import FunctionComponent from "Renderer/types/function-component.interface"

export interface DiskSpaceCategory {
  filesType: string
  occupiedMemory: number
  filesAmount?: number
  color: string
  icon: FunctionComponent<ImageInterface>
  url?: string
}

export interface FilesManagerState {
  memoryData: DiskSpaceCategory[]
}
