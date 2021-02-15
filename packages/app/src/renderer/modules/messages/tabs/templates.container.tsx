/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { ChangeEvent } from "react"
import { connect } from "react-redux"
import { select, Dispatch } from "Renderer/store"
import Templates, {
  Template,
} from "Renderer/modules/messages/tabs/templates.component"
import { TemplateCallback } from "Renderer/models/templates/templates"
import { RootModel } from "Renderer/models/models"
import { SortOrder } from "Common/enums/sort-order.enum"

const selector = select(({ templates }) => ({
  templates: templates.filteredList,
}))

const mapStateToProps = (state: RootModel) => ({
  ...state.templates,
  ...selector(state, {}),
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  changeSortOrder: (sortOrder: SortOrder) =>
    dispatch.templates.changeSortOrder(sortOrder),
  onSearchTermChange: ({ target }: ChangeEvent<HTMLInputElement>) =>
    dispatch.templates.changeSearchValue(target.value),
  createNewTemplate: (template: TemplateCallback) =>
    dispatch.templates.createNewTemplate(template),
  saveTemplate: (template: Template) =>
    dispatch.templates.saveTemplate(template),
  removeTemplates: (payload: string[]) =>
    dispatch.templates.removeTemplates(payload),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps as Dispatch
)(Templates)
