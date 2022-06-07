/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { connect } from "react-redux"
import { ReduxRootState } from "Renderer/store"
import { deleteTemplates } from "App/templates/actions"
import { Templates } from "App/templates/components"
import { createTemplate } from "App/templates/actions"
import { hideDeleteModal } from "App/templates/actions/base.action"

const mapStateToProps = (state: ReduxRootState) => ({
  templates: state.templates.data,
  loading: state.templates.loading,
  error: state.templates.error,
  deletingState: state.templates.deletingState,
})

const mapDispatchToProps = {
  createTemplate,
  deleteTemplates,
  hideDeleteModal,
}

export default connect(mapStateToProps, mapDispatchToProps)(Templates)
