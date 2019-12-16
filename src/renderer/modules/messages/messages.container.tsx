import { ChangeEvent } from "react"
import { connect } from "react-redux"
import { select } from "Renderer/store"
import Messages from "./messages.component"

const mapStateToProps = select(({ messages }) => ({
  list: messages.filteredList,
  visibilityFilter: messages.visibilityFilter,
}))

const mapDispatchToProps = (dispatch: any) => ({
  changeSearchValue: ({ target }: ChangeEvent<HTMLInputElement>) =>
    dispatch.messages.handleSearchValue(target.value),
  changeVisibilityFilter: ({ target }: ChangeEvent<HTMLSelectElement>) =>
    dispatch.messages.handleVisibilityFilter(target.value),
})

export default connect(mapStateToProps, mapDispatchToProps)(Messages)
