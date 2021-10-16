/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { PaginationBody } from "@mudita/pure"
import createEndpoint from "Backend/endpoints/create-endpoint"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import Adapters from "Backend/adapters/adapters.interface"
import { GetThreadsResponse } from "Backend/adapters/pure-phone-messages/pure-phone-messages.class"
import DeviceResponse from "Backend/adapters/device-response.interface"

const handleGetThreadsRequest = (
  { pureMessages }: Adapters,
  pagination: PaginationBody
): Promise<DeviceResponse<GetThreadsResponse>> =>
  pureMessages.getThreads(pagination)

const registerGetThreadsRequest = createEndpoint({
  name: IpcRequest.GetThreads,
  handler: handleGetThreadsRequest,
})

export default registerGetThreadsRequest
