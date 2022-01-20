/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useEffect } from "react"
import { connect } from "react-redux"
import { Router } from "react-router"
import { History } from "history"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import NetworkStatusChecker from "Renderer/components/core/network-status-checker/network-status-checker.container"
import BaseRoutes from "Renderer/routes/base-routes"
import { ReduxRootState, RootState, TmpDispatch } from "Renderer/store"
import { URL_MAIN, URL_ONBOARDING, URL_OVERVIEW } from "Renderer/constants/urls"
import useRouterListener from "Renderer/utils/hooks/use-router-listener/use-router-listener"
import ModalsManager from "App/modals-manager/containers/modals-manager.container"
import { UpdatingState } from "Renderer/models/basic-info/basic-info.typings"
import { getConnectedDevice } from "App/device"
import { RestoreDeviceDataState } from "App/restore-device/reducers"
import { CrashDump } from "App/crash-dump"

import modalService from "Renderer/components/core/modal/modal.service"

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
    settingsLoaded: state.settings.settingsLoaded,
    deviceConnected: state.device.status.connected,
    deviceUpdating: state.device.updatingState === UpdatingState.Updating,
  }
}

const mapDispatchToProps = (dispatch: TmpDispatch) => ({
  getConnectedDevice: () => dispatch(getConnectedDevice()),
  sendDiagnosticData: dispatch.settings.sendDiagnosticData,
})

export default connect(mapStateToProps, mapDispatchToProps)(BaseApp)
