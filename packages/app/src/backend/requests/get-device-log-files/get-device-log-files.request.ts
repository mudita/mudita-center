/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Adapters from "Backend/adapters/adapters.interface"
import createEndpoint from "Backend/endpoints/create-endpoint"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import DeviceResponse from "Backend/adapters/device-response.interface"
import { DeviceLogFilesOption } from "Backend/adapters/pure-phone/pure-phone-adapter.class"
import { DeviceFile } from "Backend/device-file-system-service/device-file-system-service"

const handleGetDeviceLogFiles = async (
  { purePhone }: Adapters,
  option?: DeviceLogFilesOption
): Promise<DeviceResponse<DeviceFile[]>> => {
  return purePhone.getDeviceLogFiles(option)
}

const registerGetDeviceLogFiles = createEndpoint({
  name: IpcRequest.GetDeviceLogFiles,
  handler: handleGetDeviceLogFiles,
})

export default registerGetDeviceLogFiles
