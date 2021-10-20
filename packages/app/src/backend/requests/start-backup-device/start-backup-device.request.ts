/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { StartBackupResponseBody } from "@mudita/pure"
import Adapters from "Backend/adapters/adapters.interface"
import createEndpoint from "Backend/endpoints/create-endpoint"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import DeviceResponse from "Backend/adapters/device-response.interface"

const handleStartBackupDevice = async ({
  purePhone,
}: Adapters): Promise<DeviceResponse<StartBackupResponseBody>> => {
  return purePhone.startBackupDevice()
}

const registerStartBackupDeviceRequest = createEndpoint({
  name: IpcRequest.StartBackupDevice,
  handler: handleStartBackupDevice,
})

export default registerStartBackupDeviceRequest
