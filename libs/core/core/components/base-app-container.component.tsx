/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { connect } from "react-redux"
import { Router } from "react-router"
import { History } from "history"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import BaseRoutes from "Core/core/routes/base-routes"
import BaseApp from "Core/core/components/base-app.component"

interface Props {
  history: History
}

const BaseAppContainer: FunctionComponent<Props> = ({ history }) => {
  return (
    <Router history={history}>
      <BaseApp />
      <BaseRoutes />
    </Router>
  )
}

const mapDispatchToProps = {}

export default connect(undefined, mapDispatchToProps)(BaseAppContainer)
