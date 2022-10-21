/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { SerialPortDevice } from "App/device/types/serial-port-device.type"
import { IpcRequest } from "App/__deprecated__/common/requests/ipc-request.enum"
import { ipcRenderer } from "electron-better-ipc"
import { RequestResponse } from "App/core/types/request-response.interface"

const connectDevice = (): Promise<RequestResponse<SerialPortDevice>> =>
  ipcRenderer.callMain(IpcRequest.ConnectDevice)

export default connectDevice
