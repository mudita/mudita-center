/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useEffect } from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { connect } from "react-redux"
import NetworkStatusChecker from "Renderer/components/core/network-status-checker/network-status-checker.container"
import { Router } from "react-router"
import BaseRoutes from "Renderer/routes/base-routes"
import { ReduxRootState, RootState, TmpDispatch } from "Renderer/store"
import { History } from "history"
import { URL_MAIN, URL_ONBOARDING, URL_OVERVIEW } from "Renderer/constants/urls"
import useRouterListener from "Renderer/utils/hooks/use-router-listener/use-router-listener"
import CollectingDataModal from "Renderer/modules/settings/containers/collecting-data-modal.container"
import AppForcedUpdateFlow from "Renderer/modules/settings/containers/app-forced-update-flow.container"
import AppUpdateFlow from "Renderer/modules/settings/containers/app-update-flow.container"
import { UpdatingState } from "Renderer/models/basic-info/basic-info.typings"
import { getConnectedDevice } from "App/device"
import { RestoreDeviceDataState } from "App/restore-device/reducers"
import { CrashDump } from "App/crash-dump"

interface Props {
  getConnectedDevice: () => void
  loadContacts: () => void
  history: History
  deviceFeaturesVisible?: boolean
  deviceConnecting?: boolean
  settingsLoaded?: boolean
  deviceParred?: boolean
  sendDiagnosticData: () => void
}

const BaseApp: FunctionComponent<Props> = ({
  getConnectedDevice,
  loadContacts,
  history,
  deviceFeaturesVisible,
  deviceConnecting,
  settingsLoaded,
  deviceParred,
  sendDiagnosticData,
}) => {
  useRouterListener(history, {
    [URL_MAIN.contacts]: [() => loadContacts()],
    [URL_MAIN.phone]: [() => loadContacts()],
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

  return (
    <>
      <NetworkStatusChecker />
      <CollectingDataModal />
      <AppForcedUpdateFlow />
      <AppUpdateFlow />
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
  }
}

const mapDispatchToProps = (dispatch: TmpDispatch) => ({
  getConnectedDevice: () => dispatch(getConnectedDevice),
  loadContacts: () => dispatch.contacts.loadData(),
  sendDiagnosticData: dispatch.settings.sendDiagnosticData,
})

export default connect(mapStateToProps, mapDispatchToProps)(BaseApp)
