import { ChangeEvent } from "react"
import { connect } from "react-redux"
import { VisibilityFilter } from "Renderer/models/messages/messages.interface"
import { RootModel } from "Renderer/models/models"
import Messages from "./messages.component"
import { select } from "Renderer/store"

const selector = select(({ messages }) => ({
  list: messages.filteredList,
}))

const mapStateToProps = (state: RootModel) => ({
  ...state.messages,
  ...selector(state, {}),
})

const mapDispatchToProps = (dispatch: any) => ({
  changeSearchValue: ({ target }: ChangeEvent<HTMLInputElement>) =>
    dispatch.messages.changeSearchValue(target.value),
  changeVisibilityFilter: (filter: VisibilityFilter) =>
    dispatch.messages.changeVisibilityFilter(filter),
  deleteConversation: (ids: string[]) =>
    dispatch.messages.deleteConversation(ids),
})

export default connect(mapStateToProps, mapDispatchToProps)(Messages)
