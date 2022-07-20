/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Adapters from "App/__deprecated__/backend/adapters/adapters.interface"
import createEndpoint from "App/__deprecated__/backend/endpoints/create-endpoint"
import NetworkInfo from "App/__deprecated__/common/interfaces/network-info.interface"
import { IpcRequest } from "App/__deprecated__/common/requests/ipc-request.enum"
import {
  RequestResponse,
  RequestResponseStatus,
} from "App/core/types/request-response.interface"

const handleNetworkRequestInfo = async ({
  pureNetwork,
}: Adapters): Promise<RequestResponse<NetworkInfo>> => {
  const getSimCardsResponse = await pureNetwork.getSimCards()

  if (
    getSimCardsResponse.status === RequestResponseStatus.Ok &&
    getSimCardsResponse.data !== undefined
  ) {
    return {
      status: RequestResponseStatus.Ok,
      data: {
        simCards: getSimCardsResponse.data,
      },
    }
  } else {
    return {
      status: RequestResponseStatus.Error,
    }
  }
}

const registerNetworkInfoRequest = createEndpoint({
  name: IpcRequest.GetNetworkInfo,
  handler: handleNetworkRequestInfo,
})

export default registerNetworkInfoRequest
