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
import { useRouterListener } from "App/core/hooks"
import ModalsManager from "App/modals-manager/containers/modals-manager.container"
import { getConnectedDevice } from "App/device/actions"
import { sendDiagnosticData } from "App/settings/actions"
import { State } from "App/core/constants"
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
  deviceLocked?: boolean
  deviceUpdating: boolean
  deviceRestarting: boolean
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
  deviceLocked,
  deviceUpdating,
  deviceRestarting,
}) => {
  useRouterListener(history, {
    [URL_MAIN.contacts]: [],
    [URL_MAIN.phone]: [],
    [URL_OVERVIEW.root]: [() => getConnectedDevice()],
    [URL_MAIN.messages]: [],
  })

  useEffect(() => {
    if (deviceRestarting) {
      return
    }

    if (deviceConnecting || deviceLocked) {
      history.push(URL_ONBOARDING.connecting)
    } else if (!deviceFeaturesVisible) {
      history.push(URL_ONBOARDING.welcome)
    }
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deviceFeaturesVisible, deviceConnecting, deviceRestarting, deviceLocked])

  useEffect(() => {
    if (deviceParred && Boolean(settingsLoaded)) {
      sendDiagnosticData()
    }
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deviceParred, settingsLoaded])

  useEffect(() => {
    if (!deviceConnected && !deviceUpdating) {
      void modalService.closeModal(true)
    }
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

const isDeviceRestarting = (state: RootState & ReduxRootState): boolean => {
  if (!state.device.status.unlocked) {
    return false
  }

  if (state.update.updateOsState === State.Loading) {
    return true
  }

  if (state.backup.backingUpState === State.Loading) {
    return true
  }

  if (state.backup.restoringState === State.Loading) {
    return true
  }

  return false
}

const mapStateToProps = (state: RootState & ReduxRootState) => {
  return {
    deviceFeaturesVisible:
      (state.device.status.connected &&
        Boolean(state.device.status.unlocked)) ||
      state.update.updateOsState === State.Loading ||
      state.backup.restoringState === State.Loading ||
      state.backup.restoringState === State.Failed ||
      state.backup.backingUpState === State.Loading ||
      state.backup.backingUpState === State.Failed,
    deviceConnecting: state.device.status.connecting,
    deviceParred:
      state.device.status.loaded && Boolean(state.device.status.unlocked),
    settingsLoaded: state.settings.loaded,
    deviceConnected: state.device.status.connected,
    deviceLocked:
      state.device.status.connected && !state.device.status.unlocked,
    deviceUpdating: state.update.updateOsState === State.Loading,
    deviceRestarting: isDeviceRestarting(state),
  }
}

const mapDispatchToProps = {
  getConnectedDevice,
  sendDiagnosticData,
}

export default connect(mapStateToProps, mapDispatchToProps)(BaseApp)
