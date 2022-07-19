/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Adapters from "App/__deprecated__/backend/adapters/adapters.interface"
import createEndpoint from "App/__deprecated__/backend/endpoints/create-endpoint"
import { IpcRequest } from "App/__deprecated__/common/requests/ipc-request.enum"
import path from "path"
import getAppSettingsMain from "App/__deprecated__/main/functions/get-app-settings"
import { RequestResponse } from "App/core/types/request-response.interface"

const handleUpdateOs = async (
  { purePhone }: Adapters,
  { fileName }: { fileName: string }
): Promise<RequestResponse> => {
  const { osDownloadLocation } = await getAppSettingsMain()
  const filePath = path.join(osDownloadLocation, fileName)

  return purePhone.updateOs(filePath)
}

const registerUpdateOsRequest = createEndpoint({
  name: IpcRequest.UpdateOs,
  handler: handleUpdateOs,
})

export default registerUpdateOsRequest
