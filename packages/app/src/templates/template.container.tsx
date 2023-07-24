/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { connect } from "react-redux"
import { ReduxRootState } from "App/__deprecated__/renderer/store"
import { Templates } from "App/templates/components"
import {
  createTemplate,
  deleteTemplates,
  updateTemplate,
  updateTemplateOrder,
  resetAllItems,
  selectAllItems,
  toggleItem,
} from "App/templates/actions"
import { templatesListSelector } from "App/templates/selectors"

const mapStateToProps = (state: ReduxRootState) => ({
  templates: templatesListSelector(state),
  loading: state.templates.loading,
  loaded: state.templates.loaded,
  error: state.templates.error,
  selectedItems: state.templates.selectedItems.rows,
  allItemsSelected:
    state.templates.selectedItems.rows.length === state.templates.data.length,
})

const mapDispatchToProps = {
  createTemplate,
  deleteTemplates,
  updateTemplate,
  updateTemplateOrder,
  resetAllItems,
  selectAllItems,
  toggleItem,
}

export default connect(mapStateToProps, mapDispatchToProps)(Templates)
