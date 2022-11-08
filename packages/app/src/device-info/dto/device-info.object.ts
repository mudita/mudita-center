/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { CaseColor } from "App/device/constants"

// DEPRECATED
import { SimCard } from "App/__deprecated__/renderer/models/basic-info/basic-info.typings"

export interface DeviceInfo {
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
  caseColour: CaseColor
  backupLocation: string
}
