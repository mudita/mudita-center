import { Slicer } from "@rematch/select"
import { StateProps } from "Renderer/models/messages/messages.interface"
import {
  filterTopics,
  mockedTopics,
  searchTopics,
  sortTopics,
} from "Renderer/models/messages/utils"

const initialState = {
  topics: mockedTopics,
  searchValue: "",
}

export default {
  state: initialState,
  reducers: {
    changeSearchValue(
      state: StateProps,
      searchValue: StateProps["searchValue"]
    ) {
      return { ...state, searchValue }
    },
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
        let list = state.topics
        list = searchTopics(list, state.searchValue)
        list = filterTopics(list, state.visibilityFilter)
        return sortTopics(list)
      })
    },
  }),
}
