/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { connect } from "react-redux"
import { ReduxRootState } from "Renderer/store"
import { TemplatesList } from "App/templates/components"

const mapStateToProps = (state: ReduxRootState) => ({
  templates: state.templates.data,
})

export default connect(mapStateToProps)(TemplatesList)
