import { Slicer } from "@rematch/select"
import { FilesManagerState } from "Renderer/models/files-manager/files-manager.interface"
import { prepareDataForStackedBarChart } from "Renderer/models/files-manager/utils"
import Upload from "Renderer/svg/upload.svg"
// TODO: add icon
const initialStateValue: FilesManagerState = {
  memoryData: [
    {
      filesType: "Music",
      occupiedMemory: 5848538500,
      filesAmount: 15,
      color: "#6D9BBC",
      icon: Upload,
    },
    {
      filesType: "Voice Recorder",
      occupiedMemory: 584850000,
      filesAmount: 3,
      color: "#AEBEC9",
      icon: Upload,
    },
    {
      filesType: "Storage",
      occupiedMemory: 58485385111,
      filesAmount: 85,
      color: "#E3F3FF",
      icon: Upload,
    },
    {
      filesType: "Free",
      occupiedMemory: 5848538522,
      filesAmount: 44,
      color: "#E9E9E9",
      icon: Upload,
    },
  ],
}

export default {
  state: initialStateValue,
  selectors: (slice: Slicer<typeof initialStateValue>) => ({
    stackedBarChart() {
      return slice(state => {
        return prepareDataForStackedBarChart(state)
      })
    },
    memoryChart() {
      return slice(state => {
        return state.memoryData
      })
    },
  }),
}
