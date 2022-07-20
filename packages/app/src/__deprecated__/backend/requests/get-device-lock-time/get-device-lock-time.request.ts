/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Adapters from "App/__deprecated__/backend/adapters/adapters.interface"
import createEndpoint from "App/__deprecated__/backend/endpoints/create-endpoint"
import { IpcRequest } from "App/__deprecated__/common/requests/ipc-request.enum"
import { GetPhoneLockTimeResponseBody } from "@mudita/pure"
import { RequestResponse } from "App/core/types/request-response.interface"

const handleGetDeviceLockTime = ({
  purePhone,
}: Adapters): Promise<RequestResponse<GetPhoneLockTimeResponseBody>> => {
  return purePhone.getDeviceLockTime()
}

const registerGetDeviceLockTime = createEndpoint({
  name: IpcRequest.GetDeviceLockTime,
  handler: handleGetDeviceLockTime,
})

export default registerGetDeviceLockTime
