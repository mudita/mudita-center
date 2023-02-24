/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceInfo as DeviceInfoRaw } from "App/device/types/mudita-os"
import { CaseColor } from "App/device/constants"
import { DeviceInfo } from "App/device-info/dto"
import { SimCardPresenter } from "App/device-info/presenters/sim-card.presenter"

const missingStorageBytes = 300000000

const fromMebiToByte = (mebi: number): number => {
  const factor = 1048576
  return mebi * factor
}

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
        reservedSpace:
          fromMebiToByte(Number(data.systemReservedSpace)) +
          missingStorageBytes,
        usedUserSpace: fromMebiToByte(Number(data.usedUserSpace)),
        total:
          fromMebiToByte(Number(data.deviceSpaceTotal)) + missingStorageBytes,
      },
      caseColour: data.caseColour ? data.caseColour : CaseColor.Gray,
      backupFilePath: data.backupFilePath ? data.backupFilePath : "",
      updateFilePath: data.updateFilePath ? data.updateFilePath : "/sys/user/update.tar",
      recoveryStatusFilePath: data.recoveryStatusFilePath
        ? data.recoveryStatusFilePath
        : "",
      syncFilePath: data.syncFilePath ? data.syncFilePath : "",
    }
  }
}
