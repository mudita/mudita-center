/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { MuditaDevice } from "../src"
import { RequestConfig } from "../src"

const singleRequest = async (
  device: MuditaDevice,
  requestConfig: RequestConfig
) => {
  console.log("request: ", JSON.stringify(requestConfig))

  const response = await device.request(requestConfig)

  console.log("response: ", JSON.stringify(response))
}

export default singleRequest
