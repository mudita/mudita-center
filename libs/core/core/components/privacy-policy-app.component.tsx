/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { History } from "history"
import { Route, Router } from "react-router"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { URL_MAIN } from "Core/__deprecated__/renderer/constants/urls"
import { PrivacyPolicyUI } from "Core/settings/components"

interface Props {
  history: History
}

const PrivacyPolicyApp: FunctionComponent<Props> = ({ history }) => {
  return (
    <Router history={history}>
      <Route path={URL_MAIN.privacyPolicy}>
        <PrivacyPolicyUI />
      </Route>
    </Router>
  )
}

export default PrivacyPolicyApp
