/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import "./wdyr"
import "reflect-metadata"
import translationConfig from "App/translations.config.json"
import App from "App/app.component"
import modalService from "Core/__deprecated__/renderer/components/core/modal/modal.service"
import store from "Core/__deprecated__/renderer/store"
import * as React from "react"
import { createRoot } from "react-dom/client"
import Modal from "react-modal"
require("./fonts/main/style.css")

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
require("dotenv").config()

// Create main element
const mainElement = document.createElement("div")
mainElement.id = "app"
document.body.appendChild(mainElement)
Modal.setAppElement("#app")
const root = createRoot(mainElement)

if (module.hot !== undefined) {
  module.hot.accept("App/app.component", () => {
    root.render(<App />)
  })
}
root.render(<App />)

// Setup modal service
modalService.bindStore(store)
modalService.setDefaultLocale(translationConfig.defaultLanguage)
