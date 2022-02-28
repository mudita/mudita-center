/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Adapters from "Backend/adapters/adapters.interface"
import createEndpoint from "Backend/endpoints/create-endpoint"
import { IpcDeviceFileSystem } from "App/device-file-system"
import DeviceResponse from "Backend/adapters/device-response.interface"
import { UploadFileLocallyPayload } from "Backend/adapters/device-file-system/device-file-system-adapter.class"

const handleUploadDeviceFileLocally = async (
  { deviceFileSystem }: Adapters,
  payload: UploadFileLocallyPayload
): Promise<DeviceResponse> => {
  return deviceFileSystem.uploadFileLocally(payload)
}

const registerUploadDeviceFileLocallyRequest = createEndpoint({
  name: IpcDeviceFileSystem.UploadDeviceFileLocally,
  handler: handleUploadDeviceFileLocally,
})

export default registerUploadDeviceFileLocallyRequest
