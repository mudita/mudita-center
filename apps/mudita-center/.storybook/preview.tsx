import { withThemeFromJSXProvider } from "@storybook/addon-themes"
import {
  GenericThemeProvider as Provider,
  GlobalStyle as GenericGlobalStyle,
} from "../../../libs/generic-view/theme/src"
import CoreGlobalStyle from "../../../libs/core/core/styles/global-style.component"
import { appTheme } from "Root/app-theme"
import { FunctionComponent } from "react"

const GlobalStyles: FunctionComponent = () => {
  return (
    <>
      <GenericGlobalStyle />
      <CoreGlobalStyle />
    </>
  )
}

export const decorators = [
  withThemeFromJSXProvider({
    themes: {
      light: appTheme,
    },
    defaultTheme: "light",
    Provider,
    GlobalStyles,
  }),
]
