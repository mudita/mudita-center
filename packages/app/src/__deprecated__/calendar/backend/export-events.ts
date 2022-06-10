/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcMain } from "electron-better-ipc"
import { IpcRequest } from "App/__deprecated__/common/requests/ipc-request.enum"
import { CalendarEvent } from "App/__deprecated__/calendar/store/calendar.interfaces"
import { app, dialog, shell } from "electron"
import { intl } from "App/__deprecated__/renderer/utils/intl"
import { defineMessages } from "react-intl"
import { convertEventsToICal } from "App/__deprecated__/calendar/helpers/convert-events/convert-events-to-ical"
import path from "path"
import logger from "App/__deprecated__/main/utils/logger"

const messages = defineMessages({
  dialogTitle: { id: "module.calendar.exportSaveDialogTitle" },
  defaultFilename: { id: "module.calendar.exportDefaultFileName" },
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
            name: events[0].name,
            numberOfEvents: events.length,
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
          logger.error(
            `Export Events: save to ical file. Data: ${JSON.stringify(error)}`
          )
        }
        shell.showItemInFolder(filePath)
        return true
      }

      return false
    }
  )
}

export default registerEventsExportListener
