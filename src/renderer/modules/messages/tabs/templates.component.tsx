import { ChangeEvent } from "react"
import { connect } from "react-redux"
import Templates from "Renderer/modules/messages/tabs/templates-ui.component"
import { RootModel } from "Renderer/models/models"

const mapStateToProps = (state: RootModel) => {
  return state.templates
}

const mapDispatchToProps = (dispatch: any) => ({
  onSearchTermChange: ({ target }: ChangeEvent<HTMLInputElement>) =>
    dispatch.templates.changeSearchValue(target.value),
})

export default connect(mapStateToProps, mapDispatchToProps)(Templates)
