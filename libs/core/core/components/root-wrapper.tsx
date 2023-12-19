/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { connect, useDispatch } from "react-redux"
import { History } from "history"
import React, { useEffect, useMemo } from "react"
import { IntlProvider } from "react-intl"
import { ipcRenderer } from "electron-better-ipc"
import translationConfig from "App/translations.config.json"
import { ThemeProvider } from "styled-components"
import { Normalize } from "styled-normalize"
import GlobalStyle from "Core/core/styles/global-style.component"
import theme from "Core/core/styles/theming/theme"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import HelpApp from "Core/core/components/help-app.component"
import ErrorApp from "Core/core/components/error-app.component"
import BaseApp from "Core/core/components/base-app.component"
import { QuestionAndAnswer } from "Core/help/components/help.component"
import { initAnalyticDataTracker } from "Core/analytic-data-tracker/helpers"
import { EULAAgreement } from "Core/eula-agreement/components"
import LicenseApp from "Core/core/components/license-app.component"
import TermsOfServiceApp from "Core/core/components/terms-of-service-app.component"
import PrivacyPolicyApp from "Core/core/components/privacy-policy-app.component"
import SarApp from "Core/core/components/sar-app.component"
import { HelpActions } from "Core/__deprecated__/common/enums/help-actions.enum"
import { Mode } from "Core/__deprecated__/common/enums/mode.enum"
import localeEn from "Core/__deprecated__/renderer/locales/default/en-US.json"
import { Dispatch } from "Core/__deprecated__/renderer/store"
import { ModalProvider } from "Core/__deprecated__/renderer/components/core/modal/modal.service"
import modalService from "Core/__deprecated__/renderer/components/core/modal/modal.service"
import { registerDeviceConnectedListener } from "Core/device-manager/listeners/device-connected.listener"
import { handleDeviceConnected } from "Core/device-manager/actions/handle-device-connected"
import { URL_OVERVIEW } from "Core/__deprecated__/renderer/constants/urls"

interface Props {
  history: History
}

const RootWrapper: FunctionComponent<Props> = ({ history }) => {
  const mode = new URLSearchParams(window.location.search).get("mode")
  const saveToStore = async (normalizeData: QuestionAndAnswer) =>
    await ipcRenderer.callMain(HelpActions.SetStoreValue, normalizeData)
  const getStoreData = async (key?: string) =>
    await ipcRenderer.callMain(HelpActions.GetStore, key)

  const RenderRoutes = useMemo(
    () => () => {
      if (mode === Mode.ServerError) {
        return <ErrorApp history={history} />
      }

      if (mode === Mode.Help) {
        return (
          <HelpApp
            history={history}
            saveToStore={saveToStore}
            getStoreData={getStoreData}
          />
        )
      }

      if (mode === Mode.License) {
        return <LicenseApp history={history} />
      }

      if (mode === Mode.TermsOfService) {
        return <TermsOfServiceApp history={history} />
      }

      if (mode === Mode.PrivacyPolicy) {
        return <PrivacyPolicyApp history={history} />
      }

      if (mode === Mode.Sar) {
        return <SarApp history={history} />
      }

      return <BaseApp history={history} />
    },
    [mode, history]
  )

  // App Business Logic
  const dispatch = useDispatch<Dispatch>()

  const onDeviceConnectedHandler = async () => {
    const result = await dispatch(handleDeviceConnected())

    if (result) {
      history.push(URL_OVERVIEW.root)
    }
  }

  useEffect(() => {
    void initAnalyticDataTracker()
  }, [])

  useEffect(() => {
    const deviceConnected = registerDeviceConnectedListener(
      onDeviceConnectedHandler
    )
    return () => {
      deviceConnected()
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <IntlProvider
        defaultLocale={translationConfig.defaultLanguage}
        locale={translationConfig.defaultLanguage}
        messages={localeEn}
      >
        <ModalProvider service={modalService}>
          <EULAAgreement>
            <Normalize />
            <GlobalStyle />
            <RenderRoutes />
          </EULAAgreement>
        </ModalProvider>
      </IntlProvider>
    </ThemeProvider>
  )
}

const mapDispatchToProps = {}

export default connect(undefined, mapDispatchToProps)(RootWrapper)
