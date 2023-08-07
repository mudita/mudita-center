/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { BatteryStateKompakt } from "App/device/constants"
import { SimCardKompakt } from "App/device/types/kompakt/sim-card-kompakt.type"

export type PayloadKompakt = {
  serialNumber: string
  version: number
  batteryState: BatteryStateKompakt
  batteryCapacity: number
  simCards: SimCardKompakt[]
  message?: string
}
