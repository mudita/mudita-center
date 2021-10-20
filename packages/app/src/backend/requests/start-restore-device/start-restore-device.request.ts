/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { StartRestoreRequestConfigBody } from "@mudita/pure"
import Adapters from "Backend/adapters/adapters.interface"
import createEndpoint from "Backend/endpoints/create-endpoint"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import DeviceResponse from "Backend/adapters/device-response.interface"

const handleStartRestoreDevice = async (
  { purePhone }: Adapters,
  config: StartRestoreRequestConfigBody
): Promise<DeviceResponse> => {
  return purePhone.startRestoreDevice(config)
}

const registerStartRestoreDeviceRequest = createEndpoint({
  name: IpcRequest.StartRestoreDevice,
  handler: handleStartRestoreDevice,
})

export default registerStartRestoreDeviceRequest
