/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Adapters from "Backend/adapters/adapters.interface"
import createEndpoint from "Backend/endpoints/create-endpoint"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import DeviceResponse from "Backend/adapters/device-response.interface"

const handleImportDeviceErrorFile = async (
  { purePhone }: Adapters,
  filePath: string
): Promise<DeviceResponse> => {
  return purePhone.importDeviceErrorFile(filePath)
}

const registerImportDeviceErrorFile = createEndpoint({
  name: IpcRequest.ImportDeviceErrorFile,
  handler: handleImportDeviceErrorFile,
})

export default registerImportDeviceErrorFile
