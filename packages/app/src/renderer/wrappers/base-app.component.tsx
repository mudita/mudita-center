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
  toggleAppCollectingData: (appCollectingData: boolean) => void
  setAppUpdateStepModalDisplayed: () => void
}

const BaseApp: FunctionComponent<Props> = ({
  store,
  history,
  pureFeaturesVisible,
  deviceConnecting,
  pureNeverConnected,
  appUpdateAvailable,
  settingsLoaded,
  appCollectingData,
  appUpdateStepModalDisplayed,
  toggleAppCollectingData,
  setAppUpdateStepModalDisplayed,
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
    } else if (!pureFeaturesVisible && !pureNeverConnected) {
      history.push(URL_MAIN.news)
    } else if (!pureFeaturesVisible && pureNeverConnected) {
      history.push(URL_ONBOARDING.root)
    } else if (pureFeaturesVisible && !pureNeverConnected) {
      history.push(URL_MAIN.overview)
    }
  }, [pureFeaturesVisible, pureNeverConnected, deviceConnecting])

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
      {appUpdateStepModalVisible && (
        <AppUpdateStepModal closeModal={closeAppUpdateStepModal} />
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
    appUpdateStepModalDisplayed: state.settings.appUpdateStepModalDisplayed,
  }
}

const mapDispatchToProps = ({ basicInfo, settings }: any) => ({
  toggleAppCollectingData: settings.toggleAppCollectingData,
  setAppUpdateStepModalDisplayed: settings.setAppUpdateStepModalDisplayed,
})

export default connect(mapStateToProps, mapDispatchToProps)(BaseApp)
