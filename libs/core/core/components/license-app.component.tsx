/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { History } from "history"
import { Route, Router } from "react-router"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { URL_MAIN } from "Core/__deprecated__/renderer/constants/urls"
import { LicenseUI } from "Core/settings/components/license/license-ui.component"
interface Props {
  history: History
}

const LicenseApp: FunctionComponent<Props> = ({ history }) => {
  return (
    <Router history={history}>
      <Route path={URL_MAIN.license}>
        <LicenseUI />
      </Route>
    </Router>
  )
}

export default LicenseApp