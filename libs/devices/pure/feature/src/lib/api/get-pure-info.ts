/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  Pure,
  PureEndpointNamed,
  PureInfoResponse,
  PureMethodNamed,
} from "devices/pure/models"
import { OKResponse, PureSerialPort } from "devices/pure/adapters"

export const getPureInfo = async (device: Pure) => {
  const response = await PureSerialPort.request(device, {
    endpoint: PureEndpointNamed.DeviceInfo,
    method: PureMethodNamed.Get,
    options: {
      timeout: 5000,
    },
  })

  return {
    ...response,
    ...(response.ok ? { body: response.body as PureInfoResponse } : {}),
  }
}

export type GetPureInfoOkResponse = OKResponse<
  PureEndpointNamed.DeviceInfo,
  PureMethodNamed.Get
>

