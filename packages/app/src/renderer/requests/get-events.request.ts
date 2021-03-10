/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import DeviceResponse from "Backend/adapters/device-response.interface"
import { Calendar } from "Renderer/models/calendar/calendar.interfaces"

const getEvents = async (): Promise<DeviceResponse<Calendar[]>> => {
  return ipcRenderer.callMain(IpcRequest.GetEvents)
}

export default getEvents
