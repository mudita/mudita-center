/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useMemo } from "react"
import { IntlProvider } from "react-intl"
import { History } from "history"
import { ipcRenderer } from "electron-better-ipc"
import translationConfig from "App/translations.config.json"
import { ThemeProvider } from "styled-components"
import { Normalize } from "styled-normalize"
import GlobalStyle from "Core/core/styles/global-style.component"
import theme from "Core/core/styles/theming/theme"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import HelpApp from "Core/core/components/help-app.component"
import ErrorApp from "Core/core/components/error-app.component"
import BaseAppContainer from "Core/core/components/base-app-container.component"
import { QuestionAndAnswer } from "Core/help/components/help.component"
import LicenseApp from "Core/core/components/license-app.component"
import TermsOfServiceApp from "Core/core/components/terms-of-service-app.component"
import PrivacyPolicyApp from "Core/core/components/privacy-policy-app.component"
import SarApp from "Core/core/components/sar-app.component"
import { HelpActions } from "Core/__deprecated__/common/enums/help-actions.enum"
import { Mode } from "Core/__deprecated__/common/enums/mode.enum"
import localeEn from "Core/__deprecated__/renderer/locales/default/en-US.json"
import { ModalProvider } from "Core/__deprecated__/renderer/components/core/modal/modal.service"
import modalService from "Core/__deprecated__/renderer/components/core/modal/modal.service"

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

      return <BaseAppContainer history={history} />
    },
    [mode, history]
  )

  return (
    <ThemeProvider theme={theme}>
      <IntlProvider
        defaultLocale={translationConfig.defaultLanguage}
        locale={translationConfig.defaultLanguage}
        messages={localeEn}
      >
        <ModalProvider service={modalService}>
          <Normalize />
          <GlobalStyle />
          <RenderRoutes />
        </ModalProvider>
      </IntlProvider>
    </ThemeProvider>
  )
}

export default RootWrapper
