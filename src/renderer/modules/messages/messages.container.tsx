import { ChangeEvent } from "react"
import { connect } from "react-redux"
import { VisibilityFilter } from "Renderer/models/messages/messages.interface"
import { RootModel } from "Renderer/models/models"
import Messages from "./messages.component"
import store, { select } from "Renderer/store"
import contextMenu from "App/context-menu/context-menu"

const selector = select(({ messages }) => ({
  list: messages.filteredList,
}))

const mapStateToProps = (state: RootModel) => ({
  ...state.messages,
  ...state.settings,
  ...selector(state, {}),
})

const mapDispatchToProps = (dispatch: any) => ({
  changeSearchValue: ({ target }: ChangeEvent<HTMLInputElement>) =>
    dispatch.messages.changeSearchValue(target.value),
  changeVisibilityFilter: (filter: VisibilityFilter) =>
    dispatch.messages.changeVisibilityFilter(filter),
  deleteConversation: (ids: string[]) =>
    dispatch.messages.deleteConversation(ids),
  markAsRead: (ids: string[]) => dispatch.messages.markAsRead(ids),
  toggleReadStatus: (ids: string[]) => dispatch.messages.toggleReadStatus(ids),
})

contextMenu.registerItems("Messages", [
  {
    label: "Load default topics",
    click: () => store.dispatch.messages._devLoadDefaultTopics(),
  },
  {
    label: "Clear all topics",
    click: () => store.dispatch.messages._devClearAllTopics(),
  },
])

export default connect(mapStateToProps, mapDispatchToProps)(Messages)
