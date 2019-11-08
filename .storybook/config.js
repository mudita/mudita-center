import { configure, addDecorator } from "@storybook/react"
import { action } from "@storybook/addon-actions"
import GlobalStyle from "../app/theming/global-style.component"
import { Normalize } from "styled-normalize"
import React from "react"
import { ThemeProvider } from "styled-components"
import theme from "../app/theming/theme"

const req = require.context("../app", true, /\.stories\.tsx$/)
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
