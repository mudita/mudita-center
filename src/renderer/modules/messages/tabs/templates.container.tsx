import { ChangeEvent } from "react"
import { connect } from "react-redux"
import { select, Dispatch } from "Renderer/store"
import Templates, {
  Template,
} from "Renderer/modules/messages/tabs/templates.component"
import { TemplateCallback } from "Renderer/models/templates/templates"

const mapStateToProps = select(({ templates }) => ({
  templates: templates.filteredList,
}))

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onSearchTermChange: ({ target }: ChangeEvent<HTMLInputElement>) =>
    dispatch.templates.changeSearchValue(target.value),
  newTemplate: (template: TemplateCallback) =>
    dispatch.templates.createNewTemplate(template),
  saveTemplate: (template: Template) =>
    dispatch.templates.saveTemplate(template),
  onDeleteButtonClick: (payload: string[]) =>
    dispatch.templates.removeItems(payload),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps as Dispatch
)(Templates)
