/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { connect } from "react-redux"
import { ReduxRootState } from "Renderer/store"
import { TemplatesList } from "App/templates/components"
import { deleteTemplates } from "App/templates/actions"

const mapStateToProps = (state: ReduxRootState) => ({
  templates: state.templates.data,
})

const mapDispatchToProps = {
  deleteTemplates,
}

export default connect(mapStateToProps, mapDispatchToProps)(TemplatesList)
