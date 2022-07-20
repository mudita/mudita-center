/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Adapters from "App/__deprecated__/backend/adapters/adapters.interface"
import createEndpoint from "App/__deprecated__/backend/endpoints/create-endpoint"
import { IpcRequest } from "App/__deprecated__/common/requests/ipc-request.enum"
import { DeviceFilesOption } from "App/__deprecated__/backend/adapters/pure-phone/pure-phone-adapter.class"
import { RequestResponse } from "App/core/types/request-response.interface"

const handleGetDeviceCrashDumpFiles = async (
  { purePhone }: Adapters,
  option?: DeviceFilesOption
): Promise<RequestResponse<string[]>> => {
  return purePhone.getDeviceCrashDumpFiles(option)
}

const registerGetDeviceCrashDumpFiles = createEndpoint({
  name: IpcRequest.GetDeviceCrashDumpFiles,
  handler: handleGetDeviceCrashDumpFiles,
})

export default registerGetDeviceCrashDumpFiles
