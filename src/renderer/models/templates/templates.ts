import { templates } from "Renderer/components/core/table/table.fake-data"
import { StateProps } from "Renderer/models/templates/templates.interface"

const initalState: StateProps = {
  templates,
  searchValue: "",
}

export default {
  state: initalState,
  reducers: {
    changeSearchValue(
      state: StateProps,
      searchValue: StateProps["searchValue"]
    ) {
      return { ...state, searchValue }
    },
  },
  // selectors: (slice: Slicer<StateProps>) => ({
  //   filteredList() {
  //     return slice(state => {
  //       return filterCalls(state.calls, state.visibilityFilter)
  //     })
  //   },
  // }),
}
