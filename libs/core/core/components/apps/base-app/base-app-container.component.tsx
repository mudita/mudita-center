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
import { RoutesHistoryProvider } from "shared/utils"
import AltLinkDownloadPreventer from "Core/core/components/alt-link-download-preventer.component"

const BaseAppContainer: FunctionComponent = () => {
  return (
    <Router history={history}>
      <AltLinkDownloadPreventer>
        <BaseApp />
        <RoutesHistoryProvider>
          <BaseRoutes />
        </RoutesHistoryProvider>
      </AltLinkDownloadPreventer>
    </Router>
  )
}

export default BaseAppContainer
