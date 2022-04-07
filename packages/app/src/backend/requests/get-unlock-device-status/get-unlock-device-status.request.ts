/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Adapters from "Backend/adapters/adapters.interface"
import createEndpoint from "Backend/endpoints/create-endpoint"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import { RequestResponse } from "App/core/types/request-response.interface"

const handleGetUnlockDeviceStatus = ({
  purePhone,
}: Adapters): Promise<RequestResponse> => {
  return purePhone.getUnlockDeviceStatus()
}

const registerGetUnlockDeviceStatus = createEndpoint({
  name: IpcRequest.GetUnlockDeviceStatus,
  handler: handleGetUnlockDeviceStatus,
})

export default registerGetUnlockDeviceStatus
