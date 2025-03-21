/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import path from "path"
import axios from "axios"
import { BrowserWindow } from "electron"
import { ipcMain } from "electron-better-ipc"
import { pathExists, readJSON, writeJSON } from "fs-extra"
import { MuditaCenterServerRoutes } from "shared/utils"
import { HelpData, HelpEvent } from "help/models"
import getAppPath from "Core/__deprecated__/main/utils/get-app-path"
import logger from "Core/__deprecated__/main/utils/logger"
import { IpcEvent } from "Core/core/decorators"
import defaultHelp from "../default-help.json"

const helpPath = path.join(`${getAppPath()}`, "help-v2.json")

export class HelpService {
  private readonly mainApplicationWindow: BrowserWindow

  constructor(win: BrowserWindow) {
    this.mainApplicationWindow = win
  }

  async initialize() {
    await this.initializeDefaultData()
    void this.update()
  }

  @IpcEvent(HelpEvent.GetData)
  async getData() {
    return (await readJSON(helpPath)) as HelpData
  }

  private async getNewestData(nextSyncToken?: string) {
    try {
      const { data } = await axios.get<HelpData>(
        `${process.env.MUDITA_CENTER_SERVER_URL}/${MuditaCenterServerRoutes.HelpV2}`,
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
}
