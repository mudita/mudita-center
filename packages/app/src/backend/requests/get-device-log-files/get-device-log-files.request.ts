/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Adapters from "Backend/adapters/adapters.interface"
import createEndpoint from "Backend/endpoints/create-endpoint"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import DeviceResponse from "Backend/adapters/device-response.interface"

const handleGetDeviceLogFiles = async (
  { purePhone }: Adapters,
  maxBytes?: number
): Promise<DeviceResponse<File[]>> => {
  return purePhone.getDeviceLogFiles(maxBytes)
}

const registerGetDeviceLogFiles = createEndpoint({
  name: IpcRequest.GetDeviceLogFiles,
  handler: handleGetDeviceLogFiles,
})

export default registerGetDeviceLogFiles
