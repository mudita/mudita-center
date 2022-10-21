/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  GetRestoreDeviceStatusRequestConfig,
  GetRestoreDeviceStatusResponseBody,
} from "App/device/types/mudita-os"
import Adapters from "App/__deprecated__/backend/adapters/adapters.interface"
import createEndpoint from "App/__deprecated__/backend/endpoints/create-endpoint"
import { IpcRequest } from "App/__deprecated__/common/requests/ipc-request.enum"
import { RequestResponse } from "App/core/types/request-response.interface"

const handleGetRestoreDeviceStatus = async (
  { purePhone }: Adapters,
  config: GetRestoreDeviceStatusRequestConfig["body"]
): Promise<RequestResponse<GetRestoreDeviceStatusResponseBody>> => {
  return purePhone.getRestoreDeviceStatus(config)
}

const registerGetRestoreDeviceStatusRequest = createEndpoint({
  name: IpcRequest.GetRestoreDeviceStatus,
  handler: handleGetRestoreDeviceStatus,
})

export default registerGetRestoreDeviceStatusRequest
