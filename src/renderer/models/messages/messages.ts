import {
  Author,
  StateProps,
  Topic,
} from "Renderer/models/messages/messages.interface"
import {
  filterTopics,
  searchTopics,
  sortTopics,
} from "Renderer/models/messages/utils/topics-utils"
import { createFullMessagesCollection } from "Renderer/models/messages/utils/messages.helpers"
import { createSelector, Slicer, StoreSelectors } from "@rematch/select"
import { makeIsCallerMatching } from "Renderer/models/messages/utils/caller-utils.ts"

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
      const withMarkAsReadTopics = state.topics.map((topic) => {
        if (ids.includes(topic.id)) {
          return {
            ...topic,
            unread: false,
          }
        }
        return topic
      })
      return { ...state, topics: withMarkAsReadTopics }
    },
    toggleReadStatus(state: StateProps, ids: string[]) {
      const withMarkAsUnreadTopics = state.topics.map((topic) => {
        if (ids.includes(topic.id)) {
          return {
            ...topic,
            unread: !topic.unread,
          }
        }
        return topic
      })
      return { ...state, topics: withMarkAsUnreadTopics }
    },
  },
  selectors: (slice: Slicer<StateProps>) => ({
    filteredList() {
      return (state: any) => {
        let list = createFullMessagesCollection(state)
        list = searchTopics(list, state.messages.searchValue)
        list = filterTopics(list, state.messages.visibilityFilter)
        return sortTopics(list)
      }
    },
    getTopics() {
      return slice((state) => state.topics)
    },
    getAllCallers(models: StoreSelectors<StateProps>) {
      return createSelector(models.messages.getTopics, (topics: Topic[]) => {
        return topics.map(({ caller }) => caller)
      })
    },
    isTopicThreadOpening(models: StoreSelectors<StateProps>) {
      return createSelector(
        models.messages.getAllCallers,
        (callers: Author[]) => {
          return (phoneNumber: string, callerId: string) => {
            const isCallerMatching = makeIsCallerMatching(phoneNumber, callerId)
            return !callers.some(isCallerMatching)
          }
        }
      )
    },
  }),
}
