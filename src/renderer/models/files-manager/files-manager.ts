import { Slicer } from "@rematch/select"
import { FilesManagerState } from "Renderer/models/files-manager/files-manager.interface"
import { createModel } from "@rematch/core"
import { RootModel } from "Renderer/models/models"

export const initialState: FilesManagerState = {
  memoryData: [],
}

const filesManager = createModel<RootModel>({
  state: initialState,
  selectors: (slice: Slicer<typeof initialState>) => ({
    memoryChartData() {
      return slice((state) => {
        return state.memoryData
      })
    },
  }),
})

export default filesManager
