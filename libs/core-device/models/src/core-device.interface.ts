/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { CaseColour } from "core-device/models"
import { DeviceType } from "device-protocol/models"
import { DeviceProperties } from "device-manager/models"
import { DeviceId } from "Core/device/constants/device-id"

export interface Device extends DeviceProperties {
  id: DeviceId
  serialNumber: string | undefined
  deviceType: DeviceType
  caseColour: CaseColour | undefined
}

export interface CoreDeviceState {
  devices: Record<string, Device>
}
