/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Adapters from "Backend/adapters/adapters.interface"
import createEndpoint from "Backend/endpoints/create-endpoint"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import { RequestResponse } from "App/core/types/request-response.interface"

const handleChangeSimRequest = ({ pureNetwork }: Adapters): RequestResponse => {
  return pureNetwork.setActiveCard()
}

const registerChangeSimCardRequest = createEndpoint({
  name: IpcRequest.ChangeSim,
  handler: handleChangeSimRequest,
})

export default registerChangeSimCardRequest
