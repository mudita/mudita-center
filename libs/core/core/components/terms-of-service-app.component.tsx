/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import history from "Core/core/routes/history"
import { Route, Router } from "react-router"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { URL_MAIN } from "Core/__deprecated__/renderer/constants/urls"
import { TermsOfServiceUI } from "Core/settings/components"


const TermsOfServiceApp: FunctionComponent = ( ) => {
  return (
    <Router history={history}>
      <Route path={URL_MAIN.termsOfService}>
        <TermsOfServiceUI />
      </Route>
    </Router>
  )
}

export default TermsOfServiceApp
