import { ChangeEvent } from "react"
import { connect } from "react-redux"
import Templates from "Renderer/modules/messages/tabs/templates-ui.component"
import { select, Dispatch } from "Renderer/store"

const mapStateToProps = select(({ templates }) => ({
  templates: templates.filteredList,
}))

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onSearchTermChange: ({ target }: ChangeEvent<HTMLInputElement>) =>
    dispatch.templates.changeSearchValue(target.value),
  onDeleteButtonClick: (payload: string[]) =>
    dispatch.templates.removeItems(payload),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps as Dispatch
)(Templates)
