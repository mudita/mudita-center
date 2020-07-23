import { Slicer } from "@rematch/select"
import { FilesManagerState } from "Renderer/models/files-manager/files-manager.interface"

export const initialState: FilesManagerState = {
  memoryData: [],
}

export default {
  state: initialState,
  selectors: (slice: Slicer<typeof initialState>) => ({
    memoryChartData() {
      return slice((state) => {
        return state.memoryData
      })
    },
  }),
}
