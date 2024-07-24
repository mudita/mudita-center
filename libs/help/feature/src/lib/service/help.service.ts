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
import { omit } from "lodash"

const helpPath = path.join(`${getAppPath()}`, "help-v2.json")

export class HelpService {
  constructor() {}

  private async getNewestData(lastUpdate?: string) {
    try {
      const { data } = await axios.get<HelpData>(
        "http://localhost:8888/.netlify/functions/help-v2",
        {
          params: {
            lastUpdate,
          },
        }
      )
      return {
        categories: data.categories,
        subcategories: data.subcategories,
        articles: data.articles,
        assets: data.assets,
        lastUpdate: new Date().toISOString(),
      }
    } catch {
      return {
        categories: {},
        subcategories: {},
        articles: {},
        assets: {},
        lastUpdate: new Date("2024-01-01").toISOString(),
      }
    }
  }

  private async updateStoredData() {
    let helpData: HelpData
    if (await pathExists(helpPath)) {
      const oldHelpData = (await readJSON(helpPath)) as HelpData
      const newHelpData = await this.getNewestData(oldHelpData.lastUpdate)
      helpData = {
        categories: {
          ...oldHelpData.categories,
          ...newHelpData?.categories,
        },
        subcategories: {
          ...oldHelpData.subcategories,
          ...newHelpData?.subcategories,
        },
        articles: {
          ...oldHelpData.articles,
          ...newHelpData?.articles,
        },
        assets: {
          ...oldHelpData.assets,
          ...newHelpData?.assets,
        },
        lastUpdate: newHelpData?.lastUpdate,
      }
      const helpNeedsUpdate =
        JSON.stringify(omit(oldHelpData, "lastUpdate")) !==
        JSON.stringify(omit(helpData, "lastUpdate"))

      if (helpNeedsUpdate) {
        void ipcMain.callFocusedRenderer(HelpEvent.DataUpdated, helpData)
      }
    } else {
      helpData = await this.getNewestData()
    }
    void writeJSON(helpPath, helpData)
    return helpData
  }

  async initialize() {
    void this.updateStoredData()

    ipcMain.answerRenderer(HelpEvent.GetData, async () => {
      const helpExists = await pathExists(helpPath)
      return helpExists
        ? ((await readJSON(helpPath)) as HelpData)
        : await this.updateStoredData()
    })
  }
}
