/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { NetworkStatusKompakt } from "App/device/constants"

export type SimCardKompakt = {
  simSlot: number
  networkOperatorName: string
  signalStrength: number
  networkStatus: NetworkStatusKompakt
}
