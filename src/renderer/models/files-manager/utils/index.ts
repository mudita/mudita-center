import { FilesManagerState } from "Renderer/models/files-manager/files-manager.interface"

export const prepareDataForStackedBarChart = (data: FilesManagerState) => {
  return data.memoryData.map(el => {
    const { filesType, filesAmount, occupiedMemory, ...rest } = el
    return {
      value: occupiedMemory,
      ...rest,
    }
  })
}
