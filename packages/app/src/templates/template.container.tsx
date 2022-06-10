/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { connect } from "react-redux"
import { ReduxRootState } from "App/__deprecated__/renderer/store"
import { deleteTemplates } from "App/templates/actions"
import { Templates } from "App/templates/components"
import { createTemplate, hideDeleteModal } from "App/templates/actions"

const mapStateToProps = (state: ReduxRootState) => ({
  templates: state.templates.data,
  loading: state.templates.loading,
  loaded: state.templates.loaded,
  error: state.templates.error,
  deleting: state.templates.deleting,
})

const mapDispatchToProps = {
  createTemplate,
  deleteTemplates,
  hideDeleteModal,
}

export default connect(mapStateToProps, mapDispatchToProps)(Templates)
