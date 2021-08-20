/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useEffect } from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { connect, Provider } from "react-redux"
import NetworkStatusChecker from "Renderer/components/core/network-status-checker/network-status-checker.container"
import { Router } from "react-router"
import BaseRoutes from "Renderer/routes/base-routes"
import { select, Store } from "Renderer/store"
import { History } from "history"
import { URL_ONBOARDING } from "Renderer/constants/urls"
import { URL_MAIN } from "Renderer/constants/urls"
import { RootState } from "Renderer/store"
import useRouterListener from "Renderer/utils/hooks/use-router-listener/use-router-listener"
import CollectingDataModal from "Renderer/wrappers/collecting-data-modal/collecting-data-modal.component"
import AppUpdateStepModal from "Renderer/wrappers/app-update-step-modal/app-update-step-modal.component"

interface Props {
  store: Store
  history: History
  pureFeaturesVisible?: boolean
  deviceConnecting?: boolean
  pureNeverConnected?: boolean
  appUpdateAvailable?: boolean
  settingsLoaded?: boolean
  appCollectingData?: boolean
  appUpdateStepModalDisplayed?: boolean
  deviceParred?: boolean
  appUpdateRequired?: boolean
  appCurrentVersion?: string
  toggleAppCollectingData: (appCollectingData: boolean) => void
  setAppUpdateStepModalDisplayed: () => void
  sendDiagnosticData: () => void
  appLatestVersion?: string
}

const BaseApp: FunctionComponent<Props> = ({
  store,
  history,
  pureFeaturesVisible,
  deviceConnecting,
  appUpdateAvailable,
  settingsLoaded,
  appCollectingData,
  appUpdateStepModalDisplayed,
  deviceParred,
  toggleAppCollectingData,
  setAppUpdateStepModalDisplayed,
  sendDiagnosticData,
  appLatestVersion,
  appUpdateRequired,
  appCurrentVersion,
}) => {
  const appUpdateStepModalVisible =
    Boolean(settingsLoaded) &&
    Boolean(appUpdateAvailable) &&
    !appUpdateStepModalDisplayed &&
    appCollectingData !== undefined

  const collectingDataModalVisible =
    Boolean(settingsLoaded) && appCollectingData === undefined

  useRouterListener(history, {
    [URL_MAIN.contacts]: [store.dispatch.contacts.loadData],
    [URL_MAIN.phone]: [store.dispatch.contacts.loadData],
    [URL_MAIN.overview]: [store.dispatch.basicInfo.loadBasicInfoData],
    [URL_MAIN.messages]: [store.dispatch.messages.loadData],
  })

  useEffect(() => {
    if (deviceConnecting) {
      history.push(URL_ONBOARDING.connecting)
    } else if (!pureFeaturesVisible) {
      history.push(URL_ONBOARDING.root)
    }
  }, [pureFeaturesVisible, deviceConnecting])

  useEffect(() => {
    if (deviceParred) {
      sendDiagnosticData()
    }
  }, [deviceParred])

  const allowToAppCollectingData = (): void => {
    toggleAppCollectingData(true)
  }

  const disallowToAppCollectingData = (): void => {
    toggleAppCollectingData(false)
  }

  const closeAppUpdateStepModal = (): void => {
    setAppUpdateStepModalDisplayed()
  }

  return (
    <Provider store={store}>
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
      <Router history={history}>
        <BaseRoutes />
      </Router>
    </Provider>
  )
}

const selection = select((models: any) => ({
  pureFeaturesVisible: models.basicInfo.pureFeaturesVisible,
  deviceConnecting: models.basicInfo.deviceConnecting,
  deviceParred: models.basicInfo.deviceParred,
}))

const mapStateToProps = (state: RootState) => {
  return {
    ...(selection(state, null) as {
      pureFeaturesVisible: boolean
      deviceConnecting: boolean
    }),
    pureNeverConnected: state.settings.pureNeverConnected,
    appUpdateAvailable: state.settings.appUpdateAvailable,
    appCollectingData: state.settings.appCollectingData,
    settingsLoaded: state.settings.settingsLoaded,
    appLatestVersion: state.settings.appLatestVersion,
    appUpdateStepModalDisplayed: state.settings.appUpdateStepModalDisplayed,
    appUpdateRequired: state.settings.appUpdateRequired,
    appCurrentVersion: state.settings.appCurrentVersion,
  }
}

const mapDispatchToProps = ({ settings }: any) => ({
  toggleAppCollectingData: settings.toggleAppCollectingData,
  setAppUpdateStepModalDisplayed: settings.setAppUpdateStepModalDisplayed,
  sendDiagnosticData: settings.sendDiagnosticData,
  setAppLatestVersion: settings.setAppLatestVersion,
})

export default connect(mapStateToProps, mapDispatchToProps)(BaseApp)
