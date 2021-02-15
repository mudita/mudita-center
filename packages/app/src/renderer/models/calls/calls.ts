/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import {
  StateProps,
  VisibilityFilter,
} from "Renderer/models/calls/calls.interface"
import { unknownCalls } from "App/renderer/components/core/table/table.fake-data"
import { Slicer } from "@rematch/select"
import { filterCalls } from "Renderer/models/calls/filter-calls"
import { mockData } from "App/__mocks__/calls-mock-data"
import { orderBy } from "lodash"
import { createModel } from "@rematch/core"
import { RootModel } from "Renderer/models/models"

const initalState: StateProps = {
  calls: [...mockData, ...unknownCalls],
  visibilityFilter: VisibilityFilter.All,
}

const calls = createModel<RootModel>({
  state: initalState,
  reducers: {
    changeVisibilityFilter(
      state: StateProps,
      visibilityFilter: StateProps["visibilityFilter"]
    ) {
      return { ...state, visibilityFilter }
    },
    deleteCall(state: StateProps, ids: string[]) {
      const updatedCalls = state.calls.filter(({ id }) => !ids.includes(id))
      return { ...state, calls: updatedCalls }
    },
  },
  selectors: (slice: Slicer<StateProps>) => ({
    filteredList() {
      return slice((state) => {
        const list = filterCalls(state.calls, state.visibilityFilter)
        return orderBy(list, ["date"], ["desc"])
      })
    },
  }),
})

export default calls
