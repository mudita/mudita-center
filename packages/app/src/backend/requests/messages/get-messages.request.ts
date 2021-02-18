/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import createEndpoint from "Backend/endpoints/create-endpoint"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import Adapters from "Backend/adapters/adapters.interface"
import { Message } from "App/messages/store/messages.interface"
import DeviceResponse from "Backend/adapters/device-response.interface"

const handleGetMessagesRequest = ({
  pureMessages,
}: Adapters): Promise<DeviceResponse<Message[]>> => pureMessages.getMessages()

const registerGetMessagesRequest = createEndpoint({
  name: IpcRequest.GetMessages,
  handler: handleGetMessagesRequest,
})

export default registerGetMessagesRequest
