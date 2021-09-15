/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import DeviceResponse, {
  DeviceResponseStatus,
} from "Backend/adapters/device-response.interface"

export const checkResponseStatus = (responses: DeviceResponse<any>[]) => {
  return responses.every(
    ({ status, data }) =>
      status === DeviceResponseStatus.Ok && data !== undefined
  )
}
