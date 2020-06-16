import {
  StateProps,
  VisibilityFilter,
} from "Renderer/models/calls/calls.interface"
import { calls } from "App/renderer/components/core/table/table.fake-data"

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
}
