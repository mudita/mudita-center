/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import path from "path"
import { pathExists, readJSON, writeJSON } from "fs-extra"
import axios from "axios"
import defaultHelp from "./default-help.json"
import { HelpData, SerializableHelpData } from "./app-help.types"
import { BrowserWindow } from "electron"
import { HelpIpcEvents } from "app-utils/models"
import { JsonStoreService } from "app-utils/main"

const helpPath = path.join(process.cwd(), "help-v2.json")

export class AppHelpService {
  private readonly jsonStore: JsonStoreService<SerializableHelpData>
  private mainWindow: BrowserWindow | null = null

  constructor() {
    this.jsonStore = new JsonStoreService<SerializableHelpData>(
      "help",
      defaultHelp as SerializableHelpData
    )
  }

  setMainWindow(window: BrowserWindow) {
    this.mainWindow = window
  }

  async initialize(): Promise<void> {
    const helpExists = await pathExists(helpPath)
    if (!helpExists) {
      const freshHelp = await this.getNewestData()
      const helpToSave = freshHelp ?? defaultHelp
      await this.jsonStore.set(helpToSave as SerializableHelpData)
      console.info("[AppHelpService] Default help data initialized")
    }
  }

  async getData(): Promise<HelpData> {
    return this.jsonStore.get()
  }

  private async getNewestData(
    nextSyncToken?: string
  ): Promise<HelpData | undefined> {
    try {
      const { data } = await axios.get<HelpData>(
        `${process.env.MUDITA_CENTER_SERVER_URL}/${"help-v2"}`,
        {
          params: { nextSyncToken },
        }
      )
      return data
    } catch (error) {
      console.warn("[AppHelpService] Failed to fetch newest help data:", error)
      return undefined
    }
  }

  async syncWithServer(): Promise<void> {
    const oldHelpData = (await readJSON(helpPath)) as HelpData
    const newHelpData = await this.getNewestData(oldHelpData.nextSyncToken)

    if (
      newHelpData &&
      newHelpData.nextSyncToken !== oldHelpData.nextSyncToken
    ) {
      await writeJSON(helpPath, newHelpData)
      if (this.mainWindow) {
        this.mainWindow.webContents.send(HelpIpcEvents.DataUpdated, newHelpData)
        console.info("[AppHelpService] Help data updated and sent to renderer")
      }
    }
  }
}
