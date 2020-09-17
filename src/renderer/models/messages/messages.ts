import { StateProps } from "Renderer/models/messages/messages.interface"
import {
  filterTopics,
  searchTopics,
  sortTopics,
} from "Renderer/models/messages/utils/topics-utils"
import { createFullMessagesCollection } from "Renderer/models/messages/utils/messages.helpers"

export const initialState: StateProps = {
  topics: [],
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
    deleteConversation(state: StateProps, ids: string[]) {
      const topics = state.topics.filter(({ id }) => !ids.includes(id))
      return { ...state, topics }
    },
    markAsRead(state: StateProps, ids: string[]) {
      const selectedTopics = state.topics.filter(({ id }) => ids.includes(id))
      const markAsReadTopics = selectedTopics.map((topic) => ({
        ...topic,
        unread: false,
      }))
      console.log({ state })
      console.log({
        ...state,
        topics: { ...state.topics, ...markAsReadTopics },
      })
      return { ...state, topics: [...state.topics, ...markAsReadTopics] }
    },
  },
  selectors: () => ({
    filteredList() {
      return (state: any) => {
        let list = createFullMessagesCollection(state)
        list = searchTopics(list, state.messages.searchValue)
        list = filterTopics(list, state.messages.visibilityFilter)
        return sortTopics(list)
      }
    },
  }),
}
