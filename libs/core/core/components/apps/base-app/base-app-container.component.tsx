/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { Router } from "react-router"
import history from "Core/core/history"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import BaseRoutes from "Core/core/components/apps/base-app/base-app-routes"
import BaseApp from "Core/core/components/apps/base-app/base-app.component"
import useAltLinkDownloadPreventer from "Core/core/components/use-alt-link-download-preventer.hook"
import useBackForwardButtonPreventer from "Core/core/components/use-back-forward-button-preventer.hook"
import { ApiDeviceModals } from "generic-view/feature"

const BaseAppContainer: FunctionComponent = () => {
  useAltLinkDownloadPreventer()
  useBackForwardButtonPreventer()

  return (
    <Router history={history}>
      <BaseApp />
      <BaseRoutes />
      <ApiDeviceModals />
    </Router>
  )
}

export default BaseAppContainer
