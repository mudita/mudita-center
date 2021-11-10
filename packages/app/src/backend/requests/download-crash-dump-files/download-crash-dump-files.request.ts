/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Adapters from "Backend/adapters/adapters.interface"
import createEndpoint from "Backend/endpoints/create-endpoint"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import DeviceResponse from "Backend/adapters/device-response.interface"

const handleDownloadCrashDumpFiles = async ({
  purePhone,
}: Adapters): Promise<DeviceResponse<string[]>> => {
  return purePhone.downloadDeviceCrashDumpFiles()
}

const registerDownloadDeviceCrashDumpFiles = createEndpoint({
  name: IpcRequest.DownloadCrashDumpFiles,
  handler: handleDownloadCrashDumpFiles,
})

export default registerDownloadDeviceCrashDumpFiles
