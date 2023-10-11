/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import translationConfig from "App/translations.config.json"
import App from "App/__deprecated__/renderer/app.component"
import modalService from "App/__deprecated__/renderer/components/core/modal/modal.service"
import store from "App/__deprecated__/renderer/store"
import * as React from "react"
import * as ReactDOM from "react-dom"
import Modal from "react-modal"

try {
  require("./fonts/main/style.css")
} catch (e) {
  require("./fonts/fallback/style.css")
}

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
require("dotenv").config()

// Create main element
const mainElement = document.createElement("div")
mainElement.id = "app"
document.body.appendChild(mainElement)
Modal.setAppElement("#app")

ReactDOM.render(<App />, mainElement)

// Setup modal service
modalService.bindStore(store)
modalService.setDefaultLocale(translationConfig.defaultLanguage)
