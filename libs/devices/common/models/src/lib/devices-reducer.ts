/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  SerialPortDeviceInfo,
  SerialPortDeviceType,
} from "app-serialport/models"
import { ApiConfig } from "devices/api-device/models"

type ApiDeviceInfo = SerialPortDeviceInfo<SerialPortDeviceType.ApiDevice> & {
  metadata: ApiConfig
}

type PureDeviceInfo = SerialPortDeviceInfo<SerialPortDeviceType.Pure> & {
  metadata: unknown
}

type HarmonyDeviceInfo = SerialPortDeviceInfo<SerialPortDeviceType.Harmony> & {
  metadata: unknown
}

type HarmonyMscDeviceInfo =
  SerialPortDeviceInfo<SerialPortDeviceType.HarmonyMsc> & {
    metadata: unknown
  }

type DeviceInfo =
  | ApiDeviceInfo
  | PureDeviceInfo
  | HarmonyDeviceInfo
  | HarmonyMscDeviceInfo

export type AppDeviceInfo = DeviceInfo & {
  active: boolean
}

export interface DevicesReducer {
  connected: AppDeviceInfo[]
}
