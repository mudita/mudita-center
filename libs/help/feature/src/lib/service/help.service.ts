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
import defaultHelp from "../default-help.json"
import logger from "Core/__deprecated__/main/utils/logger"
import { IpcEvent } from "Core/core/decorators"
import { BrowserWindow } from "electron"

const helpPath = path.join(`${getAppPath()}`, "help-v2.json")

export class HelpService {
  private readonly mainApplicationWindow: BrowserWindow

  constructor(win: BrowserWindow) {
    this.mainApplicationWindow = win
  }

  private async getNewestData(nextSyncToken?: string) {
    try {
      const { data } = await axios.get<HelpData>(
        `${process.env.MUDITA_CENTER_SERVER_V2_URL}/help-v2`,
        {
          params: {
            nextSyncToken,
          },
        }
      )
      return data
    } catch {
      return
    }
  }

  private async update() {
    const oldHelpData = (await readJSON(helpPath)) as HelpData
    const newHelpData = await this.getNewestData(oldHelpData.nextSyncToken)

    if (
      newHelpData &&
      newHelpData.nextSyncToken !== oldHelpData.nextSyncToken
    ) {
      void writeJSON(helpPath, newHelpData)
      void ipcMain.callRenderer(
        this.mainApplicationWindow,
        HelpEvent.DataUpdated,
        newHelpData
      )
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
  }

  @IpcEvent(HelpEvent.GetData)
  async getData() {
    return (await readJSON(helpPath)) as HelpData
  }
}
