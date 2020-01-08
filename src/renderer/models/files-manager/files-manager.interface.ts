import { Image as ImageInterface } from "Renderer/interfaces/image.interface"
import FunctionComponent from "Renderer/types/function-component.interface"

export interface FilesManagerData {
  filesType: string
  occupiedMemory: number
  filesAmount: number
  color: string
  icon: FunctionComponent<ImageInterface>
  url?: string
  dirPath?: string
}

export interface FilesManagerState {
  memoryData: FilesManagerData[]
}
