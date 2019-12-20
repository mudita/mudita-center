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
      occupiedMemory: 58485385,
      filesAmount: 15,
      color: "red",
    },
    {
      filesType: "Voice Recorder",
      occupiedMemory: 58485,
      filesAmount: 3,
      color: "blue",
    },
    {
      filesType: "Storage",
      occupiedMemory: 58485385111,
      filesAmount: 85,
      color: "pink",
    },
    {
      filesType: "Music",
      occupiedMemory: 5848538522,
      filesAmount: 44,
      color: "yellow",
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
  }),
}
