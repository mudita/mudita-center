import { ipcMain } from "electron-better-ipc"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import { CalendarEvent } from "Renderer/models/calendar/calendar.interfaces"
import { dialog, shell } from "electron"
import { intl } from "Renderer/utils/intl"
// import path from "path"
// import { createFullName } from "App/contacts/store/contacts.helpers"
import { defineMessages } from "react-intl"
import { convertEvents } from "App/calendar/helpers/convert-events/convert-events"

const messages = defineMessages({
  dialogTitle: { id: "view.name.calendar.export.saveDialogTitle" },
  defaultFilename: { id: "view.name.phone.contacts.export.defaultFilename" },
})

const registerEventsExportListener = () => {
  ipcMain.answerRenderer(
    IpcRequest.ExportEvents,
    async (events: CalendarEvent[]) => {
      console.log("lala", events)
      const { canceled, filePath } = await dialog.showSaveDialog({
        title: intl.formatMessage(messages.dialogTitle, {
          count: events.length,
        }),
        // defaultPath: path.join(
        //   app.getPath("documents"),
        //   intl.formatMessage(messages.defaultFilename, {
        //     name: createFullName(contacts[0]),
        //     contactsLeft: contacts.length - 1,
        //   })
        // ),
        properties: ["createDirectory", "showOverwriteConfirmation"],
        filters: [{ name: "ics", extensions: ["ics"] }],
      })

      if (!canceled && filePath) {
        convertEvents(events, filePath)
        shell.showItemInFolder(filePath)
        return true
      }

      return false
    }
  )
}

export default registerEventsExportListener

