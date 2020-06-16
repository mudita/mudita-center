import {
  StateProps,
  VisibilityFilter,
} from "Renderer/models/calls/calls.interface"
import { calls } from "App/renderer/components/core/table/table.fake-data"
import { Slicer } from "@rematch/select"

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
  },
  selectors: (slice: Slicer<StateProps>) => ({
    filteredList() {
      return slice(state => {
        const list = state.calls
        return list
      })
    },
  }),
}
