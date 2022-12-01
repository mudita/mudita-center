/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceInfo as DeviceInfoRaw } from "App/device/types/mudita-os"
import { CaseColor } from "App/device/constants"
import { DeviceInfo } from "App/device-info/dto"
import { SimCardPresenter } from "App/device-info/presenters/sim-card.presenter"

export class DeviceInfoPresenter {
  static toDto(data: DeviceInfoRaw): DeviceInfo {
    return {
      networkName: data.networkOperatorName,
      networkLevel: (Number(data.signalStrength) / 4).toFixed(2),
      osVersion: data.version,
      batteryLevel: Number((Number(data.batteryLevel) / 100).toFixed(2)),
      simCards: [SimCardPresenter.toDto(data)],
      serialNumber: data.serialNumber,
      memorySpace: {
        reservedSpace: Number(data.systemReservedSpace) * 1048576,
        usedUserSpace: Number(data.usedUserSpace) * 1048576,
        total: Number(data.deviceSpaceTotal) * 1048576,
      },
      caseColour: data.caseColour ? data.caseColour : CaseColor.Gray,
      backupLocation: data.backupLocation ? data.backupLocation : "",
    }
  }
}
