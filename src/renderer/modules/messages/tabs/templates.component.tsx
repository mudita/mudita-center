import { ChangeEvent } from "react"
import { connect } from "react-redux"
import Templates from "Renderer/modules/messages/tabs/templates-ui.component"
import { select } from "Renderer/store"

const mapStateToProps = select(({ templates }) => ({
  templates: templates.filteredList,
}))

const mapDispatchToProps = (dispatch: any) => ({
  onSearchTermChange: ({ target }: ChangeEvent<HTMLInputElement>) =>
    dispatch.templates.changeSearchValue(target.value),
})

export default connect(mapStateToProps, mapDispatchToProps)(Templates)
