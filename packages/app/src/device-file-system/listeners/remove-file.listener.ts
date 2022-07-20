/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Adapters from "App/__deprecated__/backend/adapters/adapters.interface"
import createEndpoint from "App/__deprecated__/backend/endpoints/create-endpoint"
import { IpcDeviceFileSystem } from "App/device-file-system/constants"
import { RequestResponse } from "App/core/types/request-response.interface"

const handleRemoveFile = (
  { deviceFileSystem }: Adapters,
  filePath: string
): Promise<RequestResponse> => {
  return deviceFileSystem.removeDeviceFile(filePath)
}

export const registerFileSystemRemoveRequest = createEndpoint({
  name: IpcDeviceFileSystem.Remove,
  handler: handleRemoveFile,
})
