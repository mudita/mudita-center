import { Slicer } from "@rematch/select"
import { FilesManagerState } from "Renderer/models/files-manager/files-manager.interface"
import {
  memoryDataWithConvertedBytes,
  prepareDataForStackedBarChart,
} from "Renderer/models/files-manager/utils"

const initialStateValue: FilesManagerState = {
  memoryData: [
    {
      filesType: "Music",
      occupiedMemory: 5848538500,
      filesAmount: 15,
      color: "#6D9BBC",
    },
    {
      filesType: "Voice Recorder",
      occupiedMemory: 584850000,
      filesAmount: 3,
      color: "#AEBEC9",
    },
    {
      filesType: "Storage",
      occupiedMemory: 58485385111,
      filesAmount: 85,
      color: "#E3F3FF",
    },
    {
      filesType: "Free",
      occupiedMemory: 5848538522,
      filesAmount: 44,
      color: "#E9E9E9",
    },
  ],
}

export default {
  state: initialStateValue,
  selectors: (slice: Slicer<typeof initialStateValue>) => ({
    stackedBarChart() {
      return slice(state => {
        return prepareDataForStackedBarChart(
          memoryDataWithConvertedBytes(state)
        )
      })
    },
    memoryChart() {
      return slice(state => {
        return memoryDataWithConvertedBytes(state)
      })
    },
  }),
}
