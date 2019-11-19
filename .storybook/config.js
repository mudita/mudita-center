import React from "react"
import { ThemeProvider } from "styled-components"
import { Normalize } from "styled-normalize"
import { configure, addDecorator } from "@storybook/react"
import { action } from "@storybook/addon-actions"

import GlobalStyle from "Renderer/styles/global-style.component"
import theme from "Renderer/styles/theming/theme"

import localeEn from "Renderer/locales/main/en-US.json"
import { IntlProvider } from "react-intl"
import { LANGUAGE } from "../src/renderer/constants/languages"

const req = require.context("../src", true, /\.stories\.tsx$/)
function loadStories() {
  req.keys().forEach(filename => req(filename))
}

addDecorator(story => {
  return (
    <ThemeProvider theme={theme}>
      <IntlProvider
        defaultLocale={LANGUAGE.default}
        locale={LANGUAGE.default}
        messages={localeEn}
      >
        <>
          <GlobalStyle />
          <Normalize />
          {story()}
        </>
      </IntlProvider>
    </ThemeProvider>
  )
})

configure(loadStories, module)
