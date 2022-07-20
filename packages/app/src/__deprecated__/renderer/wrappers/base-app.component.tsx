/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useEffect } from "react"
import { connect } from "react-redux"
import { Router } from "react-router"
import { History } from "history"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import NetworkStatusChecker from "App/__deprecated__/renderer/components/core/network-status-checker/network-status-checker.container"
import BaseRoutes from "App/__deprecated__/renderer/routes/base-routes"
import { ReduxRootState, RootState } from "App/__deprecated__/renderer/store"
import {
  URL_MAIN,
  URL_ONBOARDING,
  URL_OVERVIEW,
} from "App/__deprecated__/renderer/constants/urls"
import useRouterListener from "App/__deprecated__/renderer/utils/hooks/use-router-listener/use-router-listener"
import ModalsManager from "App/modals-manager/containers/modals-manager.container"
import { UpdatingState } from "App/__deprecated__/renderer/models/basic-info/basic-info.typings"
import { getConnectedDevice } from "App/device/actions"
import { sendDiagnosticData } from "App/settings/actions"
import { RestoreDeviceDataState } from "App/restore-device/reducers"
import { CrashDump } from "App/crash-dump"

import modalService from "App/__deprecated__/renderer/components/core/modal/modal.service"

interface Props {
  getConnectedDevice: () => void
  history: History
  deviceFeaturesVisible?: boolean
  deviceConnecting?: boolean
  settingsLoaded?: boolean
  deviceParred?: boolean
  deviceConnected: boolean
  deviceUpdating: boolean
  sendDiagnosticData: () => void
}

const BaseApp: FunctionComponent<Props> = ({
  getConnectedDevice,
  history,
  deviceFeaturesVisible,
  deviceConnecting,
  settingsLoaded,
  deviceParred,
  sendDiagnosticData,
  deviceConnected,
  deviceUpdating,
}) => {
  useRouterListener(history, {
    [URL_MAIN.contacts]: [],
    [URL_MAIN.phone]: [],
    [URL_OVERVIEW.root]: [() => getConnectedDevice()],
    [URL_MAIN.messages]: [],
  })

  useEffect(() => {
    if (deviceConnecting) {
      history.push(URL_ONBOARDING.connecting)
    } else if (!deviceFeaturesVisible) {
      history.push(URL_ONBOARDING.welcome)
    }
  }, [deviceFeaturesVisible, deviceConnecting])

  useEffect(() => {
    if (deviceParred && Boolean(settingsLoaded)) {
      sendDiagnosticData()
    }
  }, [deviceParred, settingsLoaded])

  useEffect(() => {
    if (!deviceConnected && !deviceUpdating) {
      modalService.closeModal(true)
    }
  }, [deviceConnected])

  return (
    <>
      <NetworkStatusChecker />
      <ModalsManager />
      <CrashDump />
      <Router history={history}>
        <BaseRoutes />
      </Router>
    </>
  )
}

const mapStateToProps = (state: RootState & ReduxRootState) => {
  return {
    deviceFeaturesVisible:
      (state.device.status.connected &&
        Boolean(state.device.status.unlocked)) ||
      state.device.updatingState === UpdatingState.Updating ||
      state.restoreDevice.state === RestoreDeviceDataState.Running ||
      state.restoreDevice.state === RestoreDeviceDataState.Error,
    deviceConnecting:
      state.device.status.connected && !state.device.status.unlocked,
    deviceParred:
      state.device.status.loaded && Boolean(state.device.status.unlocked),
    settingsLoaded: state.settings.loaded,
    deviceConnected: state.device.status.connected,
    deviceUpdating: state.device.updatingState === UpdatingState.Updating,
  }
}

const mapDispatchToProps = {
  getConnectedDevice,
  sendDiagnosticData,
}

export default connect(mapStateToProps, mapDispatchToProps)(BaseApp)
