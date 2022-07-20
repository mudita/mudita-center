/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Adapters from "App/__deprecated__/backend/adapters/adapters.interface"
import createEndpoint from "App/__deprecated__/backend/endpoints/create-endpoint"
import BatteryInfo from "App/__deprecated__/common/interfaces/battery-info.interface"
import { IpcRequest } from "App/__deprecated__/common/requests/ipc-request.enum"
import {
  RequestResponse,
  RequestResponseStatus,
} from "App/core/types/request-response.interface"

const handleBatteryInfoRequest = async ({
  pureBatteryService,
}: Adapters): Promise<RequestResponse<BatteryInfo>> => {
  const getBatteryLevelResponse = await pureBatteryService.getBatteryLevel()

  if (
    getBatteryLevelResponse.status === RequestResponseStatus.Ok &&
    getBatteryLevelResponse.data !== undefined
  ) {
    return {
      status: RequestResponseStatus.Ok,
      data: {
        charging: pureBatteryService.getChargingStatus(),
        level: getBatteryLevelResponse.data,
      },
    }
  } else {
    return {
      status: RequestResponseStatus.Error,
    }
  }
}

const registerBatteryInfoRequest = createEndpoint({
  name: IpcRequest.GetBatteryInfo,
  handler: handleBatteryInfoRequest,
})

export default registerBatteryInfoRequest
