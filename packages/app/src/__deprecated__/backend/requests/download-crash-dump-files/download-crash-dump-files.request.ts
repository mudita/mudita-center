/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Adapters from "App/__deprecated__/backend/adapters/adapters.interface"
import createEndpoint from "App/__deprecated__/backend/endpoints/create-endpoint"
import { IpcRequest } from "App/__deprecated__/common/requests/ipc-request.enum"
import { RequestResponse } from "App/core/types/request-response.interface"

const handleDownloadCrashDumpFiles = async ({
  purePhone,
}: Adapters): Promise<RequestResponse<string[]>> => {
  return purePhone.downloadDeviceCrashDumpFiles()
}

const registerDownloadDeviceCrashDumpFiles = createEndpoint({
  name: IpcRequest.DownloadCrashDumpFiles,
  handler: handleDownloadCrashDumpFiles,
})

export default registerDownloadDeviceCrashDumpFiles
