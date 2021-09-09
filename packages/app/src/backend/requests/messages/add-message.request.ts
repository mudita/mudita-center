/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import createEndpoint from "Backend/endpoints/create-endpoint"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import Adapters from "Backend/adapters/adapters.interface"
import { Message, NewMessage } from "App/messages/store/messages.interface"
import DeviceResponse from "Backend/adapters/device-response.interface"

const handleAddMessageRequest = (
  { pureMessages }: Adapters,
  newMessage: NewMessage
): Promise<DeviceResponse<Message>> => pureMessages.addMessage(newMessage)

const registerAddMessageRequest = createEndpoint({
  name: IpcRequest.AddMessage,
  handler: handleAddMessageRequest,
})

export default registerAddMessageRequest
