/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { CaseColor, DeviceType } from "Core/device"
import { DeviceBaseProperties } from "Core/device/constants/device-base-properties"
import { DeviceId } from "Core/device/constants/device-id"

export enum DeviceState {
  Connected = "CONNECTED",
  Configured = "CONFIGURED",
  Initialized = "INITIALIZED",
  Failed = "FAILED",
}

export interface Device extends DeviceBaseProperties {
  id: DeviceId
  serialNumber: string | undefined
  deviceType: DeviceType
  caseColour: CaseColor | undefined
  state: DeviceState
}

export interface DeviceManagerState {
  devices: Device[]
  activeDeviceId: DeviceId | undefined
  selectDeviceDrawerOpen: boolean
}
