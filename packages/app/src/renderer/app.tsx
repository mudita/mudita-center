/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import * as React from "react"
import * as ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { AppContainer } from "react-hot-loader"
import modalService from "Renderer/components/core/modal/modal.service"
import translationConfig from "App/translations.config.json"
import history from "Renderer/routes/history"
import store from "Renderer/store"
import RootWrapper from "Renderer/wrappers/root-wrapper"
import Modal from "react-modal"

try {
  require("./fonts/main/style.css")
} catch (e) {
  require("./fonts/fallback/style.css")
}

require("dotenv").config()

// Create main element
const mainElement = document.createElement("div")
mainElement.id = "app"
document.body.appendChild(mainElement)
Modal.setAppElement("#app")

ReactDOM.render(
  <Provider store={store}>
    <AppContainer>
      <RootWrapper history={history} />
    </AppContainer>
  </Provider>,
  mainElement
)

// Setup modal service
modalService.bindStore(store)
modalService.setDefaultLocale(translationConfig.defaultLanguage)
