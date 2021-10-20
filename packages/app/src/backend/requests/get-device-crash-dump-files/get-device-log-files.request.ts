/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Adapters from "Backend/adapters/adapters.interface"
import createEndpoint from "Backend/endpoints/create-endpoint"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import DeviceResponse from "Backend/adapters/device-response.interface"
import { DeviceFilesOption } from "Backend/adapters/pure-phone/pure-phone-adapter.class"
import { DeviceFileDeprecated } from "Backend/device-file-system-service/device-file-system-service"

const handleGetDeviceCrashDumpFiles = async (
  { purePhone }: Adapters,
  option?: DeviceFilesOption
): Promise<DeviceResponse<DeviceFileDeprecated[]>> => {
  return purePhone.getDeviceCrashDumpFiles(option)
}

const registerGetDeviceCrashDumpFiles = createEndpoint({
  name: IpcRequest.GetDeviceCrashDumpFiles,
  handler: handleGetDeviceCrashDumpFiles,
})

export default registerGetDeviceCrashDumpFiles
