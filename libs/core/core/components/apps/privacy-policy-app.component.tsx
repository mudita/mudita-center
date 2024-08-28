/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import history from "Core/core/history"
import { Route, Router } from "react-router"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { URL_MAIN } from "Core/__deprecated__/renderer/constants/urls"
import { PrivacyPolicyUI } from "Core/settings/components"
import useAltLinkDownloadPreventer from "Core/core/components/use-alt-link-download-preventer.hook"
import useBackForwardButtonPreventer from "Core/core/components/use-back-forward-button-preventer.hook"

const PrivacyPolicyApp: FunctionComponent = () => {
  useAltLinkDownloadPreventer()
  useBackForwardButtonPreventer()

  return (
    <Router history={history}>
      <Route path={URL_MAIN.privacyPolicy}>
        <PrivacyPolicyUI />
      </Route>
    </Router>
  )
}

export default PrivacyPolicyApp
