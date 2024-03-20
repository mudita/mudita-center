/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import history from "Core/core/history"
import { Route, Router } from "react-router"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { URL_OVERVIEW } from "Core/__deprecated__/renderer/constants/urls"
import SarComponent from "Core/overview/components/pure-system/sar.component"
import useAltLinkDownloadPreventerEffect from "Core/core/components/use-alt-link-download-preventer-effect.hook"

const SarApp: FunctionComponent = () => {
  useAltLinkDownloadPreventerEffect()

  return (
    <Router history={history}>
      <Route path={URL_OVERVIEW.sar}>
        <SarComponent />
      </Route>
    </Router>
  )
}

export default SarApp
