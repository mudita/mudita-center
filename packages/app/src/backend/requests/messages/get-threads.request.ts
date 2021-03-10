/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import createEndpoint from "Backend/endpoints/create-endpoint"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import Adapters from "Backend/adapters/adapters.interface"
import { Thread } from "App/messages/store/messages.interface"
import DeviceResponse from "Backend/adapters/device-response.interface"

const handleGetThreadsRequest = ({
  pureMessages,
}: Adapters): Promise<DeviceResponse<Thread[]>> => pureMessages.getThreads()

const registerGetThreadsRequest = createEndpoint({
  name: IpcRequest.GetThreads,
  handler: handleGetThreadsRequest,
})

export default registerGetThreadsRequest
