/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceType } from "Core/device"

type DeviceId = string // string as serialNumber or self-generated value when empty

export enum DeviceState {
  Connected = "CONNECTED",
  Configured = "CONFIGURED",
  Initialized = "INITIALIZED",
  Failed = "FAILED",
}

export interface InitializationOptions {
  eula: boolean
  sync: boolean
  passcode: boolean
}

export interface Device {
  id: DeviceId
  serialNumber: string | undefined
  type: DeviceType
  state: DeviceState
  initializationOptions: InitializationOptions
}

export interface DeviceManagerState {
  devices: Device[]
  activeDeviceId: DeviceId | undefined // as serialNumber
}

// TODO: handle tmp interface
export interface DeviceBaseProperty {
  serialNumber: string
  deviceType: DeviceType
}
