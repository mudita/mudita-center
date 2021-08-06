/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { History } from "history"
import { Route, Router } from "react-router"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { URL_MAIN } from "Renderer/constants/urls"
import PrivacyPolicyUI from "Renderer/modules/settings/tabs/about/components/privacy-policy/privacy-policy-ui.component"

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
