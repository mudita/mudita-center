import { templates } from "Renderer/components/core/table/table.fake-data"
import { StateProps } from "Renderer/models/templates/templates.interface"
import { Slicer } from "@rematch/select"
import { filterTemplates } from "Renderer/models/templates/filter-templates"

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
  selectors: (slice: Slicer<StateProps>) => ({
    filteredList() {
      return slice(({ templates: listOfTemplates, searchValue }) => {
        return filterTemplates(listOfTemplates, searchValue)
      })
    },
  }),
}
