/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcMain } from "electron-better-ipc"
import {
  osVersion,
  centerVersion,
} from "App/main/default-app-configuration.json"

export enum GetApplicationConfigurationEvents {
  Request = "get-lowest-supported-os-version-request",
}

export interface ApplicationConfigurationResponse {
  osVersion: string
  centerVersion: string
}

let defaultData = { osVersion, centerVersion }

try {
  defaultData = require("../app-configuration.json")
} catch {
  console.error("read app-configuration.json is failed")
}

const registerGetApplicationConfigurationListener = (): void => {
  ipcMain.answerRenderer<undefined, ApplicationConfigurationResponse>(
    GetApplicationConfigurationEvents.Request,
    async () => {
      // remove GetApplicationConfiguration from MC 0.20.3 version
      return defaultData
    }
  )
}

export default registerGetApplicationConfigurationListener
