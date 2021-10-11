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
import { RootState, ReduxRootState, TmpDispatch } from "Renderer/store"
import { History } from "history"
import { URL_ONBOARDING } from "Renderer/constants/urls"
import { URL_MAIN, URL_OVERVIEW } from "Renderer/constants/urls"
import useRouterListener from "Renderer/utils/hooks/use-router-listener/use-router-listener"
import CollectingDataModal from "Renderer/wrappers/collecting-data-modal/collecting-data-modal.component"
import AppUpdateStepModal from "Renderer/wrappers/app-update-step-modal/app-update-step-modal.component"
import { UpdatingState } from "Renderer/models/basic-info/basic-info.typings"

import { getConnectedDevice } from "App/device"
import { CrashDump } from "App/crash-dump"

interface Props {
  getConnectedDevice: () => void
  loadContacts: () => void
  loadMessages: () => void

  history: History
  pureFeaturesVisible?: boolean
  deviceConnecting?: boolean
  appUpdateAvailable?: boolean
  settingsLoaded?: boolean
  appCollectingData?: boolean
  appUpdateStepModalDisplayed?: boolean
  appUpdateStepModalShow?: boolean
  deviceParred?: boolean
  appUpdateRequired?: boolean
  appCurrentVersion?: string
  toggleAppCollectingData: (appCollectingData: boolean) => void
  setAppUpdateStepModalDisplayed: () => void
  toggleAppUpdateStepModalShow: (appUpdateStepModalShow: boolean) => void
  sendDiagnosticData: () => void
  appLatestVersion?: string
}

const BaseApp: FunctionComponent<Props> = ({
  getConnectedDevice,
  loadContacts,
  loadMessages,

  history,
  pureFeaturesVisible,
  deviceConnecting,
  appUpdateAvailable,
  settingsLoaded,
  appCollectingData,
  appUpdateStepModalDisplayed,
  appUpdateStepModalShow,
  deviceParred,
  toggleAppCollectingData,
  setAppUpdateStepModalDisplayed,
  toggleAppUpdateStepModalShow,
  sendDiagnosticData,
  appLatestVersion,
  appUpdateRequired,
  appCurrentVersion,
}) => {
  const [appUpdateStepModalVisible, setAppUpdateStepModalVisible] =
    useState<boolean>(false)

  const collectingDataModalVisible =
    Boolean(settingsLoaded) && appCollectingData === undefined

  useRouterListener(history, {
    [URL_MAIN.contacts]: [() => loadContacts()],
    [URL_MAIN.phone]: [() => loadContacts()],
    [URL_OVERVIEW.root]: [() => getConnectedDevice()],
    [URL_MAIN.messages]: [() => loadMessages(), () => loadContacts()],
  })
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
    } else if (!pureFeaturesVisible) {
      history.push(URL_ONBOARDING.root)
    } else {
      history.push(URL_ONBOARDING.connecting)
    }
  }, [pureFeaturesVisible, deviceConnecting])

  useEffect(() => {
    if (deviceParred && Boolean(settingsLoaded)) {
      sendDiagnosticData()
    }
  }, [deviceParred, settingsLoaded])

  const allowToAppCollectingData = (): void => {
    toggleAppCollectingData(true)
  }

  const disallowToAppCollectingData = (): void => {
    toggleAppCollectingData(false)
  }

  const closeAppUpdateStepModal = (): void => {
    setAppUpdateStepModalDisplayed()
    toggleAppUpdateStepModalShow(false)
  }

  return (
    <>
      <NetworkStatusChecker />
      <CollectingDataModal
        open={collectingDataModalVisible}
        onActionButtonClick={allowToAppCollectingData}
        closeModal={disallowToAppCollectingData}
      />
      {appUpdateRequired && (
        <AppUpdateStepModal
          forced
          appLatestVersion={appLatestVersion}
          appCurrentVersion={appCurrentVersion}
        />
      )}
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
    pureFeaturesVisible:
      (state.device.status.connected && !state.device.status.locked) ||
      state.device.updatingState === UpdatingState.Updating,
    deviceConnecting:
      state.device.status.connected && state.device.status.locked,
    deviceParred: state.device.status.loaded && !state.device.status.locked,
    // TODO Refactor legacy staff
    appUpdateAvailable: state.settings.appUpdateAvailable,
    appCollectingData: state.settings.appCollectingData,
    settingsLoaded: state.settings.settingsLoaded,
    appLatestVersion: state.settings.appLatestVersion,
    appUpdateStepModalDisplayed: state.settings.appUpdateStepModalDisplayed,
    appUpdateStepModalShow: state.settings.appUpdateStepModalShow,
    appUpdateRequired: state.settings.appUpdateRequired,
    appCurrentVersion: state.settings.appCurrentVersion,
  }
}

// TODO replace `TmpDispatch` with legit `Dispatch`
const mapDispatchToProps = (dispatch: TmpDispatch) => ({
  getConnectedDevice: () => dispatch(getConnectedDevice),
  loadContacts: () => dispatch.contacts.loadData(),
  loadMessages: () => dispatch.messages.loadData(),

  toggleAppCollectingData: dispatch.settings.toggleAppCollectingData,
  setAppUpdateStepModalDisplayed:
    dispatch.settings.setAppUpdateStepModalDisplayed,
  toggleAppUpdateStepModalShow: dispatch.settings.toggleAppUpdateStepModalShow,
  sendDiagnosticData: dispatch.settings.sendDiagnosticData,
  setAppLatestVersion: dispatch.settings.setAppLatestVersion,
})

export default connect(mapStateToProps, mapDispatchToProps)(BaseApp)
