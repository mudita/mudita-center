import { ChangeEvent } from "react"
import { connect } from "react-redux"
import Templates from "Renderer/modules/messages/tabs/templates-ui.component"
import { select } from "Renderer/store"
import { TemplateCallback } from "Renderer/models/templates/templates"

const mapStateToProps = select(({ templates }) => ({
  templates: templates.filteredList,
}))

const mapDispatchToProps = (dispatch: any) => ({
  onSearchTermChange: ({ target }: ChangeEvent<HTMLInputElement>) =>
    dispatch.templates.changeSearchValue(target.value),
  newTemplate: (template: TemplateCallback) =>
    dispatch.templates.createNewTemplate(template),
})

export default connect(mapStateToProps, mapDispatchToProps)(Templates)
