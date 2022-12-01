/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceInfo } from "App/device/types/mudita-os"
import { SIM } from "App/device/constants"
import { SimCard } from "App/__deprecated__/renderer/models/basic-info/basic-info.typings"

export class SimCardPresenter {
  static toDto(data: DeviceInfo): SimCard {
    return {
      slot: data.selectedSim === SIM.One ? 1 : 2,
      active: true,
      number: 12345678,
      network: data.networkOperatorName,
      networkLevel: Number((Number(data.signalStrength) / 4).toFixed(2)),
    }
  }
}
