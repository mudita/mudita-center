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
import { RequestResponse } from "App/core/types/request-response.interface"

const handleGetMessagesByThreadIdRequest = async (
  { pureMessages }: Adapters,
  body: GetMessagesBody
): Promise<RequestResponse<GetMessagesByThreadIdResponse>> => {
  const response = await pureMessages.loadAllMessagesByThreadId(body.threadId)
  const data = response.data ?? []
  return {
    ...response,
    data: { data },
  }
}

const registerGetMessagesByThreadIdRequest = createEndpoint({
  name: IpcRequest.GetMessagesByThreadId,
  handler: handleGetMessagesByThreadIdRequest,
})

export default registerGetMessagesByThreadIdRequest
