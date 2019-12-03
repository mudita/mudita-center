import * as React from "react"
import * as ReactDOM from "react-dom"
import { AppContainer } from "react-hot-loader"

import history from "Renderer/routes/history"

import store from "Renderer/store"
import RootWrapper from "Renderer/wrappers/root-wrapper"
import "./fonts/fonts.css"

import contextMenu from "Renderer/electron/contextMenu"

// Create main element
const mainElement = document.createElement("div")
document.body.appendChild(mainElement)

ReactDOM.render(
  <AppContainer>
    <RootWrapper store={store} history={history} />
  </AppContainer>,
  mainElement
)

contextMenu()
