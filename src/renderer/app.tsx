import * as React from "react"
import * as ReactDOM from "react-dom"
import { AppContainer } from "react-hot-loader"
import modalService from "Renderer/components/core/modal/modal.service"
import { defaultLanguage } from "App/translations.config.json"
import history from "Renderer/routes/history"
import store from "Renderer/store"
import RootWrapper from "Renderer/wrappers/root-wrapper"
import "./fonts/fonts.css"
import appUpdate from "./components/rest/app-update/app-update.service"
import contextMenu from "App/context-menu/context-menu"
require("dotenv").config()

// Create main element
const mainElement = document.createElement("div")
document.body.appendChild(mainElement)

ReactDOM.render(
  <AppContainer>
    <RootWrapper store={store} history={history} />
  </AppContainer>,
  mainElement
)

// Setup modal service
modalService.bindStore(store)
modalService.setDefaultLocale(defaultLanguage)

// Initialize app update
appUpdate()

// Load settings
store.dispatch.settings.loadSettings()

// Register context menus
contextMenu.registerItems("Messages", [
  {
    label: "Load default topics",
    click: () => store.dispatch.messages._devLoadDefaultTopics(),
  },
  {
    label: "Clear all topics",
    click: () => store.dispatch.messages._devClearAllTopics(),
  },
])
