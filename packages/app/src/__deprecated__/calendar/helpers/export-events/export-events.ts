/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { IpcRequest } from "App/__deprecated__/common/requests/ipc-request.enum"
import { CalendarEvent } from "App/__deprecated__/calendar/store/calendar.interfaces"

export const exportEvents = (events: CalendarEvent[]) => {
  return ipcRenderer.callMain(IpcRequest.ExportEvents, events)
}
