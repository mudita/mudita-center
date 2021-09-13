/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { History } from "history"
import { Route, Router } from "react-router"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { URL_OVERVIEW } from "Renderer/constants/urls"
import SarComponent from "App/overview/components/pure-system/sar.component"

interface Props {
  history: History
}

const SarApp: FunctionComponent<Props> = ({ history }) => {
  return (
    <Router history={history}>
      <Route path={URL_OVERVIEW.sar}>
        <SarComponent />
      </Route>
    </Router>
  )
}

export default SarApp
