import {
  FilesManagerData,
  FilesManagerState,
} from "Renderer/models/files-manager/files-manager.interface"

export const memoryDataWithConvertedBytes = (data: FilesManagerState) => {
  return data.memoryData.map((element: FilesManagerData) => ({
    ...element,
    occupiedMemory: element.occupiedMemory / Math.pow(1024, 3),
  }))
}
