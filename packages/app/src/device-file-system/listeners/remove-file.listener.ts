/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Adapters from "Backend/adapters/adapters.interface"
import createEndpoint from "Backend/endpoints/create-endpoint"
import { IpcFileSystem } from "App/device-file-system/constants"
import DeviceResponse from "Backend/adapters/device-response.interface"

const handleRemoveFile = (
  { purePhone }: Adapters,
  filePath: string
): Promise<DeviceResponse> => {
  return purePhone.removeDeviceFile(filePath)
}

export const registerFileSystemRemoveRequest = createEndpoint({
  name: IpcFileSystem.Remove,
  handler: handleRemoveFile,
})
