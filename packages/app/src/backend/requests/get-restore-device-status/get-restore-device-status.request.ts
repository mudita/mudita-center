/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  GetRestoreDeviceStatusRequestConfigBody,
  GetRestoreDeviceStatusResponseBody,
} from "@mudita/pure"
import Adapters from "Backend/adapters/adapters.interface"
import createEndpoint from "Backend/endpoints/create-endpoint"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import { RequestResponse } from "App/core/types/request-response.interface"

const handleGetRestoreDeviceStatus = async (
  { purePhone }: Adapters,
  config: GetRestoreDeviceStatusRequestConfigBody
): Promise<RequestResponse<GetRestoreDeviceStatusResponseBody>> => {
  return purePhone.getRestoreDeviceStatus(config)
}

const registerGetRestoreDeviceStatusRequest = createEndpoint({
  name: IpcRequest.GetRestoreDeviceStatus,
  handler: handleGetRestoreDeviceStatus,
})

export default registerGetRestoreDeviceStatusRequest
