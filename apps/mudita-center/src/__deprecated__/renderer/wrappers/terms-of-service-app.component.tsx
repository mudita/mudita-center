/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { History } from "history"
import { Route, Router } from "react-router"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { URL_MAIN } from "App/__deprecated__/renderer/constants/urls"
import { TermsOfServiceUI } from "App/settings/components"
interface Props {
  history: History
}

const TermsOfServiceApp: FunctionComponent<Props> = ({ history }) => {
  return (
    <Router history={history}>
      <Route path={URL_MAIN.termsOfService}>
        <TermsOfServiceUI />
      </Route>
    </Router>
  )
}

export default TermsOfServiceApp
