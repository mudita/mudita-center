import { ipcRenderer } from "electron-better-ipc"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import { CalendarEvent } from "Renderer/models/calendar/calendar.interfaces"

export const exportEvents = (events: CalendarEvent[]) => {
  return ipcRenderer.callMain(IpcRequest.ExportEvents, events)
}
