/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceInfo as DeviceInfoRaw } from "Core/device/types/mudita-os"
import { CaseColor, DeviceType } from "Core/device/constants"
import { DeviceInfo } from "Core/device-info/dto"
import { SimCardPresenter } from "Core/device-info/presenters/sim-card.presenter"
import { OnboardingState } from "Core/device/constants/onboarding-state.constant"

const pureMissingStorageBytes = 300000000

const harmonyTotalSpace = 4000000000

const getMissingStorageBytes = (
  deviceSpaceTotal: number,
  deviceType: DeviceType
): number => {
  if (deviceType === DeviceType.MuditaPure) {
    return pureMissingStorageBytes
  } else if (deviceType === DeviceType.MuditaHarmony) {
    return harmonyTotalSpace - fromMebiToByte(deviceSpaceTotal)
  }

  return 0
}

const fromMebiToByte = (mebi: number): number => {
  const factor = 1048576
  return mebi * factor
}

const mapDevDefaultToFixOsVersion = (osVersion: string): string => {
  return osVersion !== "0.0.0" ? osVersion : "999.999.999"
}

export class DeviceInfoPresenter {
  static toDto(data: DeviceInfoRaw, deviceType: DeviceType): DeviceInfo {
    return {
      networkName: data.networkOperatorName,
      networkLevel: (Number(data.signalStrength) / 4).toFixed(2),
      osVersion: mapDevDefaultToFixOsVersion(data.version),
      batteryLevel: Number((Number(data.batteryLevel) / 100).toFixed(2)),
      simCards: [SimCardPresenter.toDto(data)],
      serialNumber: data.serialNumber,
      memorySpace: {
        reservedSpace:
          fromMebiToByte(Number(data.systemReservedSpace)) +
          getMissingStorageBytes(Number(data.deviceSpaceTotal), deviceType),
        usedUserSpace: fromMebiToByte(Number(data.usedUserSpace)),
        total:
          fromMebiToByte(Number(data.deviceSpaceTotal)) +
          getMissingStorageBytes(Number(data.deviceSpaceTotal), deviceType),
      },
      caseColour: data.caseColour ? data.caseColour : CaseColor.Gray,
      backupFilePath: data.backupFilePath ? data.backupFilePath : "",
      updateFilePath: data.updateFilePath
        ? data.updateFilePath
        : "/sys/user/update.tar",
      recoveryStatusFilePath: data.recoveryStatusFilePath
        ? data.recoveryStatusFilePath
        : "",
      syncFilePath: data.syncFilePath ? data.syncFilePath : "",
      onboardingState:
        data.onboardingState === undefined
          ? OnboardingState.Finished
          : data.onboardingState,
    }
  }
}
