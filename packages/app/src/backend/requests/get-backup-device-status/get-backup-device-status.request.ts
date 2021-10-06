/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  GetBackupDeviceStatusRequestConfigBody,
  GetBackupDeviceStatusResponseBody,
} from "@mudita/pure"
import Adapters from "Backend/adapters/adapters.interface"
import createEndpoint from "Backend/endpoints/create-endpoint"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import DeviceResponse from "Backend/adapters/device-response.interface"

const handleGetBackupDeviceStatus = async (
  { purePhone }: Adapters,
  config: GetBackupDeviceStatusRequestConfigBody
): Promise<DeviceResponse<GetBackupDeviceStatusResponseBody>> => {
  return purePhone.getBackupDeviceStatus(config)
}

const registerGetBackupDeviceStatusRequest = createEndpoint({
  name: IpcRequest.GetBackupDeviceStatus,
  handler: handleGetBackupDeviceStatus,
})

export default registerGetBackupDeviceStatusRequest
