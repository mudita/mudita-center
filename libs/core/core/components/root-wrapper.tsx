/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { IntlProvider } from "react-intl"
import translationConfig from "App/translations.config.json"
import { ThemeProvider } from "styled-components"
import { Normalize } from "styled-normalize"
import GlobalStyle from "Core/core/styles/global-style.component"
import theme from "Core/core/styles/theming/theme"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import localeEn from "Core/__deprecated__/renderer/locales/default/en-US.json"
import { ModalProvider } from "Core/__deprecated__/renderer/components/core/modal/modal.service"
import modalService from "Core/__deprecated__/renderer/components/core/modal/modal.service"
import AppsSwitch from "Core/core/components/apps-switch"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

const RootWrapper: FunctionComponent = () => {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <ThemeProvider theme={theme}>
        <IntlProvider
          defaultLocale={translationConfig.defaultLanguage}
          locale={translationConfig.defaultLanguage}
          messages={localeEn}
        >
          <ModalProvider service={modalService}>
            <Normalize />
            <GlobalStyle />
            <AppsSwitch />
          </ModalProvider>
        </IntlProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default RootWrapper
