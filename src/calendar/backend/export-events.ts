import { ipcMain } from "electron-better-ipc"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import { CalendarEvent } from "Renderer/models/calendar/calendar.interfaces"

const registerEventsExportListener = () => {
  ipcMain.answerRenderer(
    IpcRequest.ExportEvents,
    async (events: CalendarEvent[]) => {
      console.log("lala", events)
    }
  )
}

export default registerEventsExportListener
