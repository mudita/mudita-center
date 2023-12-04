/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { APIFC } from "../../models/api-fc.types"
import React from "react"

interface Field {}

interface DeviceStatusProperties {
  fields?: Field[]
}

export const DeviceStatus: APIFC<DeviceStatusProperties> = ({}) => {
  return (
    <div>
      <h1>Status</h1>
    </div>
  )
}
