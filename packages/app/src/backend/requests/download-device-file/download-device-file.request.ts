/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Adapters from "Backend/adapters/adapters.interface"
import createEndpoint from "Backend/endpoints/create-endpoint"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import DeviceResponse from "Backend/adapters/device-response.interface"
import { DeviceFile } from "Backend/device-file-system-service/device-file-system-service"

const handleDownloadDeviceFile = async (
  { purePhone }: Adapters,
  filePath: string
): Promise<DeviceResponse<DeviceFile>> => {
  return purePhone.downloadDeviceFile(filePath)
}

const registerDownloadDeviceFileRequest = createEndpoint({
  name: IpcRequest.DownloadDeviceFile,
  handler: handleDownloadDeviceFile,
})

export default registerDownloadDeviceFileRequest
