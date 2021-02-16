/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import Adapters from "Backend/adapters/adapters.interface"
import createEndpoint from "Backend/endpoints/create-endpoint"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import DeviceResponse from "Backend/adapters/device-response.interface"
import path from "path"
import getAppSettingsMain from "App/main/functions/get-app-settings"

const handleUpdateOs = async (
  { purePhone }: Adapters,
  { fileName, progressChannel }: { fileName: string; progressChannel: string }
): Promise<DeviceResponse> => {
  const { pureOsDownloadLocation } = await getAppSettingsMain()
  const filePath = path.join(pureOsDownloadLocation, fileName)

  return purePhone.updateOs(filePath, progressChannel)
}

const registerUpdateOsRequest = createEndpoint({
  name: IpcRequest.UpdateOs,
  handler: handleUpdateOs,
})

export default registerUpdateOsRequest
