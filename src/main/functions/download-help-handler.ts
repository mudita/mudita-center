import { ipcMain } from "electron-better-ipc"
import { HelpActions } from "Common/enums/help-actions.enum"
import { createClient } from "contentful"

export const registerDownloadHelpHandler = () =>
  ipcMain.handle(
    HelpActions.DownloadContentfulData,
    async (event, response) => {
      const client = createClient({
        accessToken: process.env.PDA_CONTENTFUL_ACCESS_TOKEN as string,
        space: process.env.PDA_CONTENTFUL_SPACE_ID as string,
        environment: process.env.PDA_CONTENTFUL_ENVIRONMENT_ID,
        host: process.env.PDA_CONTENTFUL_HOST,
      })
      return await client.getEntries({ content_type: "helpItem" })
    }
  )

export const removeDownloadHelpHandler = () =>
  ipcMain.removeHandler(HelpActions.DownloadContentfulData)
