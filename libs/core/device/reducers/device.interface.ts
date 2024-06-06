/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { CaseColour } from "core-device/models"
import { DeviceType } from "device-protocol/models"
import { OnboardingState } from "Core/device/constants"
import { SimCard } from "Core/__deprecated__/renderer/models/basic-info/basic-info.typings"

export interface KompaktDeviceData {
  networkName: string
  networkLevel: string
  osVersion: string
  batteryLevel: number
  simCards: SimCard[]
  serialNumber: string
  memorySpace: {
    reservedSpace: number
    usedUserSpace: number
    total: number
  }
  caseColour: CaseColour
}

export interface PureDeviceData {
  networkName: string
  networkLevel: string
  osVersion: string
  batteryLevel: number
  simCards: SimCard[]
  serialNumber: string
  phoneLockTime?: number
  timeLeftToNextAttempt?: number
  memorySpace: {
    reservedSpace: number
    usedUserSpace: number
    total: number
  }
  caseColour: CaseColour
  backupFilePath: string
  token: string
  onboardingState?: OnboardingState
}

export interface HarmonyDeviceData {
  osVersion: string
  batteryLevel: number
  serialNumber: string
  memorySpace: {
    reservedSpace: number
    usedUserSpace: number
    total: number
  }
  onboardingState?: OnboardingState
  caseColour: CaseColour
}

export interface DeviceStatus {
  loaded: boolean | null
  unlocked: boolean | null
  onboardingFinished: boolean | null
  criticalBatteryLevel: boolean | null
  restarting: boolean | null
}

export interface DeviceState {
  deviceType: DeviceType | null
  data: Partial<PureDeviceData | HarmonyDeviceData | KompaktDeviceData> | null
  status: DeviceStatus
  error: Error | string | null
  externalUsageDevice: boolean | null
}
