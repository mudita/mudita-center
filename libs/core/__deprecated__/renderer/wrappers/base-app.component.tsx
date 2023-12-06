/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useEffect, useRef } from "react"
import { connect, useSelector } from "react-redux"
import { Router } from "react-router"
import { History } from "history"
import { FunctionComponent } from "Core/__deprecated__/renderer/types/function-component.interface"
import NetworkStatusChecker from "Core/__deprecated__/renderer/components/core/network-status-checker/network-status-checker.container"
import BaseRoutes from "Core/__deprecated__/renderer/routes/base-routes"
import {
  ReduxRootState,
  RootState,
  TmpDispatch,
} from "Core/__deprecated__/renderer/store"
import {
  URL_MAIN,
  URL_ONBOARDING,
  URL_OVERVIEW,
} from "Core/__deprecated__/renderer/constants/urls"
import { useRouterListener } from "Core/core/hooks"
import ModalsManager from "Core/modals-manager/components/modals-manager.container"
import { getConnectedDevice } from "Core/device/actions"
import { sendDiagnosticData } from "Core/settings/actions"
import { State } from "Core/core/constants"
import { CrashDump } from "Core/crash-dump"

import modalService from "Core/__deprecated__/renderer/components/core/modal/modal.service"
import { checkForForceUpdateNeed } from "Core/update/actions/check-for-force-update-need/check-for-force-update-need.action"
import { getDeviceLatestVersion } from "Core/settings/selectors"
import { CheckForUpdateState } from "Core/update/constants/check-for-update-state.constant"

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
  checkForOsForceUpdate: () => void
  lowestSupportedOsVersion: string | undefined
  osVersion: string | undefined
  checkingForOsForceUpdate: boolean
  shouldCheckForForceUpdateNeed: boolean
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
  checkForOsForceUpdate,
  lowestSupportedOsVersion,
  osVersion,
  checkingForOsForceUpdate,
  shouldCheckForForceUpdateNeed,
}) => {
  const { initializationFailed } = useSelector(
    (state: ReduxRootState) => state.dataSync
  )
  useRouterListener(history, {
    [URL_MAIN.contacts]: [],
    [URL_MAIN.phone]: [],
    [URL_OVERVIEW.root]: [() => getConnectedDevice()],
    [URL_MAIN.messages]: [],
  })

  useEffect(() => {
    if (
      lowestSupportedOsVersion &&
      osVersion &&
      shouldCheckForForceUpdateNeed
    ) {
      checkForOsForceUpdate()
    }
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lowestSupportedOsVersion, osVersion, shouldCheckForForceUpdateNeed])

  // Attention: If you're reading this code and wondering what's going on, you're not alone.
  // It's a bit like deciphering hieroglyphs, even for me. Please, be understanding, this is an artistic expression.
  // Changes are coming soon, but for now, you'll have to play the role of a code detective. Good luck!
  const firstRender = useRef<boolean>(true)

  useEffect(() => {
    // Timeout variable for delayed redirection
    let timeout: ReturnType<typeof setTimeout>

    // Function to handle redirection based on conditions
    const redirect = () => {
      // Conditions for redirecting to connecting or welcome screens
      const pushConnectingCondition =
        deviceConnecting ||
        deviceLocked ||
        checkingForOsForceUpdate ||
        initializationFailed
      const pushWelcomeCondition = !deviceFeaturesVisible

      if (pushConnectingCondition) {
        history.push(URL_ONBOARDING.connecting)
      } else if (pushWelcomeCondition) {
        history.push(URL_ONBOARDING.welcome)
      }
    }

    // Check if the device is restarting; if true, do nothing
    if (deviceRestarting) {
      return
    }

    // If it's the first render, set the flag to false and redirect
    if (firstRender.current) {
      firstRender.current = false
      redirect()
      return
    }

    // Check if the current path is the welcome screen or initialization didn't fail
    const isOnboardingOrInitializationFailed =
      history.location.pathname === URL_ONBOARDING.welcome ||
      !initializationFailed

    // Check if the device is not connecting and the current path is not URL_MAIN.news
    const isNotConnectingAndNotOnNewsPage = !(
      deviceConnecting === false && history.location.pathname === URL_MAIN.news
    )

    // If conditions for redirection are met
    if (isOnboardingOrInitializationFailed && isNotConnectingAndNotOnNewsPage) {
      // If the device is not connecting, delay redirection by 500 ms
      if (deviceConnecting === false) {
        timeout = setTimeout(() => {
          redirect()
        }, 500)
      } else {
        // Otherwise, redirect immediately
        redirect()
      }
    }

    // Cleanup function to clear the timeout and avoid memory leaks
    return () => clearTimeout(timeout)

    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    deviceFeaturesVisible,
    deviceConnecting,
    deviceRestarting,
    deviceLocked,
    checkingForOsForceUpdate,
    initializationFailed,
  ])

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
      state.backup.backingUpState === State.Loading,
    deviceConnecting: state.device.status.connecting,
    deviceParred:
      state.device.status.loaded && Boolean(state.device.status.unlocked),
    settingsLoaded: state.settings.loaded,
    deviceConnected: state.device.status.connected,
    deviceLocked:
      state.device.status.connected && !state.device.status.unlocked,
    deviceUpdating: state.update.updateOsState === State.Loading,
    deviceRestarting:
      isDeviceRestarting(state) || state.device.status.restarting,
    osVersion: state.device.data?.osVersion,
    lowestSupportedOsVersion: getDeviceLatestVersion(state),
    checkingForOsForceUpdate:
      state.update.checkForUpdateState === CheckForUpdateState.Loading &&
      Boolean(state.update.needsForceUpdate),
    shouldCheckForForceUpdateNeed:
      state.update.forceUpdateState === State.Initial,
  }
}

const mapDispatchToProps = (dispatch: TmpDispatch) => ({
  getConnectedDevice,
  sendDiagnosticData,
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
  checkForOsForceUpdate: () => dispatch(checkForForceUpdateNeed()),
})

export default connect(mapStateToProps, mapDispatchToProps)(BaseApp)
