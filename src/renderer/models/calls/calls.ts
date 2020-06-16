import {
  StateProps as State,
  VisibilityFilter,
} from "Renderer/models/calls/calls.interface"
import { calls } from "App/renderer/components/core/table/table.fake-data"

const initalState: State = {
  calls,
  visibilityFilter: VisibilityFilter.All,
}

export default {
  state: initalState,
  reducers: {
    changeVisibilityFilter(
      state: State,
      visibilityFilter: State["visibilityFilter"]
    ) {
      return { ...state, visibilityFilter }
    },
  },
}
