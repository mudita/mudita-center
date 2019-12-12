import { Slicer } from "@rematch/select"
import {
  InitialState,
  VisibilityFilter,
} from "Renderer/models/messages/messages.interface"
import {
  filterTopics,
  mockedTopics,
  searchTopics,
} from "Renderer/models/messages/utils"

const initialState = {
  topics: mockedTopics,
  searchValue: "",
  visibilityFilter: VisibilityFilter.All,
}

export default {
  state: initialState,
  reducers: {
    handleSearchValue(
      state: InitialState,
      payload: InitialState["searchValue"]
    ) {
      return { ...state, searchValue: payload }
    },
    handleVisibilityFilter(
      state: InitialState,
      payload: InitialState["visibilityFilter"]
    ) {
      return { ...state, visibilityFilter: payload }
    },
  },
  selectors: (slice: Slicer<InitialState>) => ({
    visibilityFilter() {
      return slice(state => {
        return state.visibilityFilter
      })
    },
    filteredList() {
      return slice(state => {
        let list = state.topics
        if (state.searchValue.length) {
          list = searchTopics(state.topics, state.searchValue)
        }
        list = filterTopics(list, state.visibilityFilter)
        return list
      })
    },
  }),
}
