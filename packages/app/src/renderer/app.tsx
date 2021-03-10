/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import * as React from "react"
import * as ReactDOM from "react-dom"
import { AppContainer } from "react-hot-loader"
import modalService from "Renderer/components/core/modal/modal.service"
import { defaultLanguage } from "App/translations.config.json"
import history from "Renderer/routes/history"
import store from "Renderer/store"
import RootWrapper from "Renderer/wrappers/root-wrapper"
import appUpdate from "./components/rest/app-update/app-update.service"
import requestDataCollecting from "App/collecting-data-modal/collecting-data-service"

try {
  require("./fonts/main/style.css")
} catch (e) {
  require("./fonts/fallback/style.css")
}

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

// Load settings
store.dispatch.settings.loadSettings()

// Request data collecting
requestDataCollecting()

// Initialize app update
appUpdate()
