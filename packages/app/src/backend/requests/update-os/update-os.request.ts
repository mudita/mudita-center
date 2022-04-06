/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Adapters from "Backend/adapters/adapters.interface"
import createEndpoint from "Backend/endpoints/create-endpoint"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import path from "path"
import getAppSettingsMain from "App/main/functions/get-app-settings"
import { RequestResponse } from "App/core/types/request-response.interface"

const handleUpdateOs = async (
  { purePhone }: Adapters,
  { fileName }: { fileName: string }
): Promise<RequestResponse> => {
  const { pureOsDownloadLocation } = await getAppSettingsMain()
  const filePath = path.join(pureOsDownloadLocation, fileName)

  return purePhone.updateOs(filePath)
}

const registerUpdateOsRequest = createEndpoint({
  name: IpcRequest.UpdateOs,
  handler: handleUpdateOs,
})

export default registerUpdateOsRequest
