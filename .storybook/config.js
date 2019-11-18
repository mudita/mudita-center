import React from "react"
import { ThemeProvider } from "styled-components"
import { Normalize } from "styled-normalize"
import { configure, addDecorator } from "@storybook/react"
import { action } from "@storybook/addon-actions"

import GlobalStyle from "Renderer/styles/global-style.component"
import theme from "Renderer/styles/theming/theme"

const req = require.context("../src", true, /\.stories\.tsx$/)
function loadStories() {
  req.keys().forEach(filename => req(filename))
}

addDecorator(story => {
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        <Normalize />
        {story()}
      </>
    </ThemeProvider>
  )
})

configure(loadStories, module)
