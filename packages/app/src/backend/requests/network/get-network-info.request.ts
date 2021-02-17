/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import Adapters from "Backend/adapters/adapters.interface"
import createEndpoint from "Backend/endpoints/create-endpoint"
import NetworkInfo from "Common/interfaces/network-info.interface"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import DeviceResponse, {
  DeviceResponseStatus,
} from "Backend/adapters/device-response.interface"

const handleNetworkRequestInfo = async ({
  pureNetwork,
}: Adapters): Promise<DeviceResponse<NetworkInfo>> => {
  const getSimCardsResponse = await pureNetwork.getSimCards()

  if (
    getSimCardsResponse.status === DeviceResponseStatus.Ok &&
    getSimCardsResponse.data !== undefined
  ) {
    return {
      status: DeviceResponseStatus.Ok,
      data: {
        simCards: getSimCardsResponse.data,
      },
    }
  } else {
    return {
      status: DeviceResponseStatus.Error,
    }
  }
}

const registerNetworkInfoRequest = createEndpoint({
  name: IpcRequest.GetNetworkInfo,
  handler: handleNetworkRequestInfo,
})

export default registerNetworkInfoRequest
