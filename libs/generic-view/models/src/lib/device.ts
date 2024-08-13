/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceType } from "device-protocol/models"
import { View } from "generic-view/utils"
import { DeviceProperties } from "device-manager/models"
import { ApiConfig, MenuConfig, OverviewData } from "device/models"
import { DeviceId } from "Core/device/constants/device-id"

export type Features = {
  "mc-overview"?: {
    config?: View
    data?: OverviewData
  }
  "mc-about"?: {
    config?: View
    data?: OverviewData
  }
} & {
  [key: string]: {
    config?: View
    data?: Record<string, unknown>
  }
}

export interface DeviceConfiguration {
  apiConfig: ApiConfig
  menuConfig?: MenuConfig
  features?: Features
}

export interface Device extends DeviceProperties, Partial<DeviceConfiguration> {
  id: DeviceId
  serialNumber: string | undefined
  deviceType: DeviceType
}

export interface ConfiguredDevice
  extends DeviceProperties,
    DeviceConfiguration {}

export interface BaseDevice {
  name?: string
  image?: string
  serialNumber: string
  disconnected?: boolean
}
