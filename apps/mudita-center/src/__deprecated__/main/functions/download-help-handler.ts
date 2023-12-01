/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcMain } from "electron-better-ipc"
import { HelpActions } from "App/__deprecated__/common/enums/help-actions.enum"
import { settingsStore } from "App/settings/store"
import { normalizeHelpData } from "App/__deprecated__/renderer/utils/contentful/normalize-help-data"
import { createClient } from "App/__deprecated__/api/mudita-center-server"
import logger from "App/__deprecated__/main/utils/logger"
import { HelpQuery } from "App/__deprecated__/api/mudita-center-server/client.interface"

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const registerDownloadHelpHandler = () => {
  const locale = settingsStore.get("language")

  ipcMain.answerRenderer(HelpActions.DownloadContentfulData, async () => {
    const client = createClient()
    const helpQuery: HelpQuery = {
      locale,
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

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const removeDownloadHelpHandler = () =>
  ipcMain.removeHandler(HelpActions.DownloadContentfulData)
