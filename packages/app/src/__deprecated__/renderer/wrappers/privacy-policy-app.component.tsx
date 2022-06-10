/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { History } from "history"
import { Route, Router } from "react-router"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { URL_MAIN } from "App/__deprecated__/renderer/constants/urls"
import PrivacyPolicyUI from "App/__deprecated__/renderer/modules/settings/tabs/about/components/privacy-policy/privacy-policy-ui.component"

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
