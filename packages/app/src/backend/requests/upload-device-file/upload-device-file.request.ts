/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Adapters from "Backend/adapters/adapters.interface"
import createEndpoint from "Backend/endpoints/create-endpoint"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import DeviceResponse from "Backend/adapters/device-response.interface"
import { UploadFilePayload } from "Backend/adapters/device-file-system/device-file-system-adapter.class"
import { arrayBufferToBuffer } from "App/file-system/helpers"

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
  { purePhone }: Adapters,
  payload: UploadFileUIPayload
): Promise<DeviceResponse> => {
  return purePhone.uploadDeviceFile(mapToUploadFilePayload(payload))
}

const registerUploadDeviceFileRequest = createEndpoint({
  name: IpcRequest.UploadDeviceFile,
  handler: handleUploadDeviceFile,
})

export default registerUploadDeviceFileRequest
