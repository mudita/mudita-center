/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Adapters from "Backend/adapters/adapters.interface"
import createEndpoint from "Backend/endpoints/create-endpoint"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import DeviceResponse from "Backend/adapters/device-response.interface"
import { UploadFilePayload } from "Backend/device-file-system-service/device-file-system-service"

const handleUploadDeviceFile = async (
  { purePhone }: Adapters,
  payload: UploadFilePayload
): Promise<DeviceResponse> => {
  return purePhone.uploadDeviceFile(payload)
}

const registerUploadDeviceFileRequest = createEndpoint({
  name: IpcRequest.UploadDeviceFile,
  handler: handleUploadDeviceFile,
})

export default registerUploadDeviceFileRequest
