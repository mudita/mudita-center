/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import axios from "axios"
import { ipcMain } from "electron-better-ipc"
import appConfig from "App/__deprecated__/main/default-app-configuration.json"

export enum GetApplicationConfigurationEvents {
  Request = "get-lowest-supported-os-version-request",
}

export interface ApplicationConfigurationResponse {
  osVersion: string
  centerVersion: string
}

let defaultData = {
  osVersion: appConfig.osVersion,
  centerVersion: appConfig.centerVersion,
}

try {
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  defaultData = require("../app-configuration.json")
} catch {
  console.error("read app-configuration.json is failed")
}

const registerGetApplicationConfigurationListener = (): void => {
  ipcMain.answerRenderer<undefined, ApplicationConfigurationResponse>(
    GetApplicationConfigurationEvents.Request,
    async () => {
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      const url = `${process.env.MUDITA_CENTER_SERVER_URL}/app-configuration`

      try {
        const { status, data } =
          await axios.get<ApplicationConfigurationResponse>(url)
        if (
          status === 200 &&
          data?.osVersion !== undefined &&
          data?.centerVersion !== undefined
        ) {
          return data
        } else {
          return defaultData
        }
      } catch (e) {
        return defaultData
      }
    }
  )
}

export default registerGetApplicationConfigurationListener
