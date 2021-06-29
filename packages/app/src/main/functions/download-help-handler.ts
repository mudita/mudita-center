/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcMain } from "electron-better-ipc"
import { HelpActions } from "Common/enums/help-actions.enum"
import helpStore from "App/main/store/help"
import settingsStore from "App/main/store/settings"
import { normalizeHelpData } from "Renderer/utils/contentful/normalize-help-data"
import { createClient } from "App/api/mudita-center-server"
import logger from "App/main/utils/logger"
import { HelpQuery } from "App/api/mudita-center-server/client.interface"

export const registerDownloadHelpHandler = () => {
  const nextSyncToken =
    helpStore.get("data") &&
    (helpStore.get("data") as Record<string, any>).nextSyncToken
  const locale = settingsStore.get("language")

  ipcMain.answerRenderer(HelpActions.DownloadContentfulData, async () => {
    const client = createClient()
    const helpQuery: HelpQuery = {
      locale,
    }
    if (nextSyncToken) {
      helpQuery.nextSyncToken = nextSyncToken
    }
    try {
      return normalizeHelpData(await client.getHelp(helpQuery), locale)
    } catch (error) {
      logger.error(
        `Help: loads data from from mudita-center-server fails. Data: ${JSON.stringify(
          error
        )}`
      )
      return false
    }
  })
}

export const removeDownloadHelpHandler = () =>
  ipcMain.removeHandler(HelpActions.DownloadContentfulData)
