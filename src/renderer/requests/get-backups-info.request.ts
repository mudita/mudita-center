/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import BackupInfo from "Common/interfaces/backup-info"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import { ipcRenderer } from "electron-better-ipc"
import DeviceResponse from "Backend/adapters/device-response.interface"

const getBackupsInfo = (): Promise<DeviceResponse<BackupInfo>> =>
  ipcRenderer.callMain(IpcRequest.GetBackupsInfo)

export default getBackupsInfo
