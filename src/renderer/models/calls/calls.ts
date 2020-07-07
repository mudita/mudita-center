import {
  StateProps,
  VisibilityFilter,
} from "Renderer/models/calls/calls.interface"
import { calls } from "App/renderer/components/core/table/table.fake-data"
import { Slicer } from "@rematch/select"
import { filterCalls } from "Renderer/models/calls/filter-calls"

const initalState: StateProps = {
  calls,
  visibilityFilter: VisibilityFilter.All,
}

export default {
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
      return slice(state => {
        return filterCalls(state.calls, state.visibilityFilter)
      })
    },
  }),
}
