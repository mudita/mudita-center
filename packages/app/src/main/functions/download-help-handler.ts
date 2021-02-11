import { ipcMain } from "electron-better-ipc"
import { HelpActions } from "Common/enums/help-actions.enum"
import helpStore from "App/main/store/help"
import settingsStore from "App/main/store/settings"
import { normalizeHelpData } from "Renderer/utils/contentful/normalize-help-data"
import { createClient } from "App/api/mudita-center-server"
import logger from "App/main/utils/logger"
import { SyncCollection } from "contentful"

export const registerDownloadHelpHandler = () => {
  const nextSyncToken =
    helpStore.get("data") &&
    (helpStore.get("data") as Record<string, any>).nextSyncToken
  const locale = settingsStore.get("language")

  ipcMain.answerRenderer(HelpActions.DownloadContentfulData, async () => {
    const client = createClient()
    const syncConfig: Record<string, any> = {
      type: "Entry",
      content_type: "helpItem",
      locale,
    }
    if (nextSyncToken) {
      syncConfig.nextSyncToken = nextSyncToken
    } else {
      syncConfig.initial = true
    }
    try {
      return normalizeHelpData(
        (await client.getHelp(syncConfig)) as SyncCollection,
        locale
      )
    } catch (error) {
      logger.error(error)
      return false
    }
  })
}

export const removeDownloadHelpHandler = () =>
  ipcMain.removeHandler(HelpActions.DownloadContentfulData)
