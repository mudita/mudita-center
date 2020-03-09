import * as React from "react"
import * as ReactDOM from "react-dom"
import { AppContainer } from "react-hot-loader"

import modalService from "Renderer/components/core/modal/modal.service"
import { LANGUAGE } from "Renderer/constants/languages"
import history from "Renderer/routes/history"

import store from "Renderer/store"
import RootWrapper from "Renderer/wrappers/root-wrapper"
import "./fonts/fonts.css"

import contextMenu from "Renderer/electron/contextMenu"
import appUpdate from "./components/rest/app-update/app-update.service"

// Create main element
const mainElement = document.createElement("div")
document.body.appendChild(mainElement)

ReactDOM.render(
  <AppContainer>
    <RootWrapper store={store} history={history} />
  </AppContainer>,
  mainElement
)

modalService.bindStore(store)
modalService.setDefaultLocale(LANGUAGE.default)

appUpdate()

contextMenu()
