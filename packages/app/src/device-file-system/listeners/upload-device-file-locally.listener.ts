/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Adapters from "App/__deprecated__/backend/adapters/adapters.interface"
import createEndpoint from "App/__deprecated__/backend/endpoints/create-endpoint"
import { IpcDeviceFileSystem } from "App/device-file-system"
import { UploadFileLocallyPayload } from "App/__deprecated__/backend/adapters/device-file-system/device-file-system-adapter.class"
import { RequestResponse } from "App/core/types/request-response.interface"

const handleUploadDeviceFileLocally = async (
  { deviceFileSystem }: Adapters,
  payload: UploadFileLocallyPayload
): Promise<RequestResponse> => {
  return deviceFileSystem.uploadFileLocally(payload)
}

const registerUploadDeviceFileLocallyRequest = createEndpoint({
  name: IpcDeviceFileSystem.UploadDeviceFileLocally,
  handler: handleUploadDeviceFileLocally,
})

export default registerUploadDeviceFileLocallyRequest
