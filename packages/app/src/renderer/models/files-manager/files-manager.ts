/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

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
