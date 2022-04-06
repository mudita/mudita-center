/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IpcRequest } from "Common/requests/ipc-request.enum"
import Adapters from "Backend/adapters/adapters.interface"
import createEndpoint from "Backend/endpoints/create-endpoint"
import DeviceInfo from "Common/interfaces/device-info.interface"
import { RequestResponse } from "App/core/types/request-response.interface"

const handleDeviceInfoRequest = async ({
  deviceBaseInfo,
}: Adapters): Promise<RequestResponse<DeviceInfo>> => {
  return deviceBaseInfo.getDeviceInfo()
}

const registerDeviceInfoRequest = createEndpoint({
  name: IpcRequest.GetDeviceInfo,
  handler: handleDeviceInfoRequest,
})

export default registerDeviceInfoRequest
