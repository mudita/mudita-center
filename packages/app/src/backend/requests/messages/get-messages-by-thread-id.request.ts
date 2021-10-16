/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import createEndpoint from "Backend/endpoints/create-endpoint"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import Adapters from "Backend/adapters/adapters.interface"
import {
  GetMessagesBody,
  GetMessagesByThreadIdResponse,
} from "Backend/adapters/pure-phone-messages/pure-phone-messages.class"
import DeviceResponse from "Backend/adapters/device-response.interface"

const handleGetMessagesByThreadIdRequest = (
  { pureMessages }: Adapters,
  body: GetMessagesBody
): Promise<DeviceResponse<GetMessagesByThreadIdResponse>> =>
  pureMessages.getMessagesByThreadId(body)

const registerGetMessagesByThreadIdRequest = createEndpoint({
  name: IpcRequest.GetMessagesByThreadId,
  handler: handleGetMessagesByThreadIdRequest,
})

export default registerGetMessagesByThreadIdRequest
