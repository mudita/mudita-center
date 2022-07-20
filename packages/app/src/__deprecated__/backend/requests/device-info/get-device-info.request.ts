/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IpcRequest } from "App/__deprecated__/common/requests/ipc-request.enum"
import Adapters from "App/__deprecated__/backend/adapters/adapters.interface"
import createEndpoint from "App/__deprecated__/backend/endpoints/create-endpoint"
import DeviceInfo from "App/__deprecated__/common/interfaces/device-info.interface"
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
