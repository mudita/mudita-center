/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Adapters from "App/__deprecated__/backend/adapters/adapters.interface"
import createEndpoint from "App/__deprecated__/backend/endpoints/create-endpoint"
import { IpcDeviceFileSystem } from "App/device-file-system"
import { DeviceFile } from "App/__deprecated__/backend/adapters/device-file-system/device-file-system-adapter.class"
import { RequestResponse } from "App/core/types/request-response.interface"

const handleDownloadDeviceFiles = async (
  { deviceFileSystem }: Adapters,
  filePaths: string[]
): Promise<RequestResponse<DeviceFile[]>> => {
  return deviceFileSystem.downloadDeviceFiles(filePaths)
}

const registerDownloadDeviceFilesRequest = createEndpoint({
  name: IpcDeviceFileSystem.DownloadDeviceFiles,
  handler: handleDownloadDeviceFiles,
})

export default registerDownloadDeviceFilesRequest
