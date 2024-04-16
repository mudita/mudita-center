/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { connect } from "react-redux"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { Templates } from "Core/templates/components"
import {
  createTemplate,
  deleteTemplates,
  updateTemplate,
  resetAllItems,
  selectAllItems,
} from "Core/templates/actions"
import { templatesListSelector } from "Core/templates/selectors"

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
  resetAllItems,
  selectAllItems,
}

export default connect(mapStateToProps, mapDispatchToProps)(Templates)
