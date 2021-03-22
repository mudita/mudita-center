import React from "react"
import { tabs } from "./paths"
import { MuditaThemeProvider } from "../src/theme/theme-provider"
import { MuditaGlobalStyle } from "../src/theme/global-style"
import { createGlobalStyle } from "styled-components"

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: { expanded: true },
  options: {
    storySort: {
      order: [
        tabs.style,
        [
          tabs.color,
          tabs.spacing,
          tabs.typography,
          [tabs.typographyBasic, tabs.typographyAdvanced],
        ],
        tabs.components,
        [tabs.atoms, tabs.molecules, tabs.organisms],
        tabs.templates,
        tabs.pages,
      ],
    },
  },
  backgrounds: {
    default: "Light",
    values: [
      {
        name: "Light",
        value: "#fafafa",
      },
      {
        name: "Dark",
        value: "#3b3f42",
      },
      {
        name: "White",
        value: "#fff",
      },
    ],
    grid: {
      cellSize: 10,
      opacity: 0.2,
      cellAmount: 5,
    },
  },
}

const StorybookGlobalStyle = createGlobalStyle`
  html, body {
    background: inherit !important;
  }
`

export const decorators = [
  (Story) => (
    <MuditaThemeProvider>
      <MuditaGlobalStyle />
      <StorybookGlobalStyle />
      <Story />
    </MuditaThemeProvider>
  ),
]
