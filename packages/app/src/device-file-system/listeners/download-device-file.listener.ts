/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Adapters from "Backend/adapters/adapters.interface"
import createEndpoint from "Backend/endpoints/create-endpoint"
import { IpcDeviceFileSystem } from "App/device-file-system"
import DeviceResponse from "Backend/adapters/device-response.interface"
import { DeviceFile } from "Backend/adapters/device-file-system/device-file-system-adapter.class"

const handleDownloadDeviceFiles = async (
  { deviceFileSystem }: Adapters,
  filePaths: string[]
): Promise<DeviceResponse<DeviceFile[]>> => {
  return deviceFileSystem.downloadDeviceFiles(filePaths)
}

const registerDownloadDeviceFilesRequest = createEndpoint({
  name: IpcDeviceFileSystem.DownloadDeviceFiles,
  handler: handleDownloadDeviceFiles,
})

export default registerDownloadDeviceFilesRequest
