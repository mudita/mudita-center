/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { connect } from "react-redux"
import { Router } from "react-router"
import { History } from "history"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import NetworkStatusChecker from "Core/__deprecated__/renderer/components/core/network-status-checker/network-status-checker.container"
import BaseRoutes from "Core/core/routes/base-routes"
import ModalsManager from "Core/modals-manager/components/modals-manager.container"
import { CrashDump } from "Core/crash-dump"
import AppInitialization from "Core/app-initialization/components/app-initialization.component"

interface Props {
  history: History
}

const BaseApp: FunctionComponent<Props> = ({ history }) => {
  return (
    <>
      <NetworkStatusChecker />
      <ModalsManager />
      <CrashDump />
      <Router history={history}>
        <AppInitialization />
        <BaseRoutes />
      </Router>
    </>
  )
}

const mapDispatchToProps = {}

export default connect(undefined, mapDispatchToProps)(BaseApp)
