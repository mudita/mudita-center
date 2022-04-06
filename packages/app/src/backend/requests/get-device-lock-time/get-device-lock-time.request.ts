/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Adapters from "Backend/adapters/adapters.interface"
import createEndpoint from "Backend/endpoints/create-endpoint"
import { IpcRequest } from "Common/requests/ipc-request.enum"
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
