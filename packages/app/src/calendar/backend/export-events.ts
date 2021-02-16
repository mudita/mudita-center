/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { ipcMain } from "electron-better-ipc"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import { CalendarEvent } from "Renderer/models/calendar/calendar.interfaces"
import { app, dialog, shell } from "electron"
import { intl } from "Renderer/utils/intl"
import { defineMessages } from "react-intl"
import { convertEventsToICal } from "App/calendar/helpers/convert-events/convert-events-to-ical"
import path from "path"
import logger from "App/main/utils/logger"

const messages = defineMessages({
  dialogTitle: { id: "view.name.calendar.export.saveDialogTitle" },
  defaultFilename: { id: "view.name.calendar.export.defaultFileName" },
})

const registerEventsExportListener = () => {
  ipcMain.answerRenderer(
    IpcRequest.ExportEvents,
    async (events: CalendarEvent[]) => {
      const { canceled, filePath } = await dialog.showSaveDialog({
        title: intl.formatMessage(messages.dialogTitle, {
          count: events.length,
        }),
        defaultPath: path.join(
          app.getPath("documents"),
          intl.formatMessage(messages.defaultFilename, {
            date: new Date(Date.now()).toISOString(),
          })
        ),
        properties: ["createDirectory", "showOverwriteConfirmation"],
        filters: [{ name: "ics", extensions: ["ics"] }],
      })

      if (!canceled && filePath) {
        const calendar = convertEventsToICal(events)
        try {
          await calendar.saveToFile(filePath)
        } catch (error) {
          logger.error(error)
        }
        shell.showItemInFolder(filePath)
        return true
      }

      return false
    }
  )
}

export default registerEventsExportListener
