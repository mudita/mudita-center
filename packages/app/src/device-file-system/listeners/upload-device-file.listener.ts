/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Adapters from "App/__deprecated__/backend/adapters/adapters.interface"
import createEndpoint from "App/__deprecated__/backend/endpoints/create-endpoint"
import { IpcDeviceFileSystem } from "App/device-file-system"
import { UploadFilePayload } from "App/__deprecated__/backend/adapters/device-file-system/device-file-system-adapter.class"
import { arrayBufferToBuffer } from "App/file-system/helpers"
import { RequestResponse } from "App/core/types/request-response.interface"

export interface UploadFileUIPayload extends Omit<UploadFilePayload, "data"> {
  data: Uint8Array
}

const mapToUploadFilePayload = ({
  data,
  ...rest
}: UploadFileUIPayload): UploadFilePayload => {
  return {
    data: arrayBufferToBuffer(data),
    ...rest,
  }
}

const handleUploadDeviceFile = async (
  { deviceFileSystem }: Adapters,
  payload: UploadFileUIPayload
): Promise<RequestResponse> => {
  return deviceFileSystem.uploadFile(mapToUploadFilePayload(payload))
}

const registerUploadDeviceFileRequest = createEndpoint({
  name: IpcDeviceFileSystem.UploadDeviceFile,
  handler: handleUploadDeviceFile,
})

export default registerUploadDeviceFileRequest
