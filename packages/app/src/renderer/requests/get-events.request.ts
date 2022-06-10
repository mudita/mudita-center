/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import { Calendar } from "App/calendar/store/calendar.interfaces"
import { RequestResponse } from "App/core/types/request-response.interface"

const getEvents = async (): Promise<RequestResponse<Calendar[]>> => {
  return ipcRenderer.callMain(IpcRequest.GetEvents)
}

export default getEvents
