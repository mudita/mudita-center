/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useEffect, useState } from "react"
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
import AppUpdateStepModal from "Renderer/wrappers/app-update-step-modal/app-update-step-modal.component"
import { UpdatingState } from "Renderer/models/basic-info/basic-info.typings"
import { getConnectedDevice } from "App/device"
import { RestoreDeviceDataState } from "App/restore-device/reducers"
import { CrashDump } from "App/crash-dump"
import { hideModals } from "App/modals-manager/actions"

interface Props {
  getConnectedDevice: () => void
  loadContacts: () => void
  history: History
  deviceFeaturesVisible?: boolean
  deviceConnecting?: boolean
  appUpdateAvailable?: boolean
  settingsLoaded?: boolean
  appCollectingData?: boolean
  appUpdateStepModalShow?: boolean
  deviceParred?: boolean
  appUpdateRequired?: boolean
  appCurrentVersion?: string
  setAppUpdateStepModalDisplayed: () => void
  toggleAppUpdateStepModalShow: (appUpdateStepModalShow: boolean) => void
  sendDiagnosticData: () => void
  appLatestVersion?: string
  hideModals: () => void
  showCollectingDataModal: () => void
}

const BaseApp: FunctionComponent<Props> = ({
  getConnectedDevice,
  loadContacts,
  history,
  deviceFeaturesVisible,
  deviceConnecting,
  appUpdateAvailable,
  settingsLoaded,
  appCollectingData,
  appUpdateStepModalShow,
  deviceParred,
  setAppUpdateStepModalDisplayed,
  toggleAppUpdateStepModalShow,
  sendDiagnosticData,
  appLatestVersion,
  appUpdateRequired,
  appCurrentVersion,
  hideModals,
  showCollectingDataModal,
}) => {
  const [appUpdateStepModalVisible, setAppUpdateStepModalVisible] =
    useState<boolean>(false)

  useRouterListener(history, {
    [URL_MAIN.contacts]: [() => loadContacts()],
    [URL_MAIN.phone]: [() => loadContacts()],
    [URL_OVERVIEW.root]: [() => getConnectedDevice()],
    [URL_MAIN.messages]: [],
  })

  useEffect(() => {
    return history.listen((location) => {
      if (URL_ONBOARDING.connecting === location.pathname) {
        hideModals()
      } else {
        // the list of modals to trigger after hideModals action
        showCollectingDataModal()
      }
    })
  }, [history])

  useEffect(() => {
    setAppUpdateStepModalVisible(
      Boolean(settingsLoaded) &&
        Boolean(appUpdateAvailable) &&
        Boolean(appUpdateStepModalShow) &&
        appCollectingData !== undefined
    )
  }, [
    settingsLoaded,
    appUpdateAvailable,
    appUpdateStepModalShow,
    appCollectingData,
  ])

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

  const closeAppUpdateStepModal = (): void => {
    setAppUpdateStepModalDisplayed()
    toggleAppUpdateStepModalShow(false)
  }

  return (
    <>
      <NetworkStatusChecker />
      <CollectingDataModal />
      <AppForcedUpdateFlow />
      {!appUpdateRequired && appUpdateStepModalVisible && (
        <AppUpdateStepModal
          appLatestVersion={appLatestVersion}
          appCurrentVersion={appCurrentVersion}
          closeModal={closeAppUpdateStepModal}
        />
      )}
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
    // TODO Refactor legacy staff
    appUpdateAvailable: state.settings.appUpdateAvailable,
    appCollectingData: state.settings.appCollectingData,
    settingsLoaded: state.settings.settingsLoaded,
    appLatestVersion: state.settings.appLatestVersion,
    appUpdateStepModalShow: state.settings.appUpdateStepModalShow,
    appUpdateRequired: state.settings.appUpdateRequired,
    appCurrentVersion: state.settings.appCurrentVersion,
  }
}

const mapDispatchToProps = (dispatch: TmpDispatch) => ({
  hideModals: () => dispatch(hideModals()),
  getConnectedDevice: () => dispatch(getConnectedDevice),
  loadContacts: () => dispatch.contacts.loadData(),

  showCollectingDataModal: dispatch.settings.showCollectingDataModal,
  setAppUpdateStepModalDisplayed:
    dispatch.settings.setAppUpdateStepModalDisplayed,
  toggleAppUpdateStepModalShow: dispatch.settings.toggleAppUpdateStepModalShow,
  sendDiagnosticData: dispatch.settings.sendDiagnosticData,
  setAppLatestVersion: dispatch.settings.setAppLatestVersion,
})

export default connect(mapStateToProps, mapDispatchToProps)(BaseApp)
