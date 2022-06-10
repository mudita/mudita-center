/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { StartRestoreRequestConfigBody } from "@mudita/pure"
import Adapters from "App/__deprecated__/backend/adapters/adapters.interface"
import createEndpoint from "App/__deprecated__/backend/endpoints/create-endpoint"
import { IpcRequest } from "App/__deprecated__/common/requests/ipc-request.enum"
import { RequestResponse } from "App/core/types/request-response.interface"

const handleStartRestoreDevice = async (
  { purePhone }: Adapters,
  config: StartRestoreRequestConfigBody
): Promise<RequestResponse> => {
  return purePhone.startRestoreDevice(config)
}

const registerStartRestoreDeviceRequest = createEndpoint({
  name: IpcRequest.StartRestoreDevice,
  handler: handleStartRestoreDevice,
})

export default registerStartRestoreDeviceRequest
