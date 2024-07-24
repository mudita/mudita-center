/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import path from "path"
import getAppPath from "Core/__deprecated__/main/utils/get-app-path"
import { pathExists, readJSON, writeJSON } from "fs-extra"
import axios from "axios"
import { HelpData, HelpEvent } from "help/models"
import { ipcMain } from "electron-better-ipc"
import defaultHelp from "App/help-v2/default-help.json"
import logger from "Core/__deprecated__/main/utils/logger"

const helpPath = path.join(`${getAppPath()}`, "help-v2.json")

export class HelpService {
  constructor() {}

  private async getNewestData(nextSyncToken?: string) {
    try {
      const { data } = await axios.get<Partial<HelpData>>(
        "http://localhost:8888/.netlify/functions/help-v2",
        {
          params: {
            nextSyncToken,
          },
        }
      )
      return data
    } catch {
      return {
        nextSyncToken: "",
      }
    }
  }

  private async update() {
    try {
      const oldHelpData = (await readJSON(helpPath)) as HelpData
      const newHelpData = await this.getNewestData(oldHelpData.nextSyncToken)

      if (newHelpData.nextSyncToken !== oldHelpData.nextSyncToken) {
        void writeJSON(helpPath, newHelpData)
        void ipcMain.callFocusedRenderer(HelpEvent.DataUpdated, newHelpData)
      }
    } catch {
      logger.error("Failed to update help data")
    }
  }

  private async initializeDefaultData() {
    const helpExists = await pathExists(helpPath)
    if (!helpExists) {
      await writeJSON(helpPath, defaultHelp)
      logger.info("Default help data initialized")
    }
  }

  async initialize() {
    await this.initializeDefaultData()
    void this.update()

    ipcMain.answerRenderer(HelpEvent.GetData, async () => {
      return (await readJSON(helpPath)) as HelpData
    })
  }
}
