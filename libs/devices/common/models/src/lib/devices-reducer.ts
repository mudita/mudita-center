/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  SerialPortDeviceInfo,
  SerialPortDeviceType,
} from "app-serialport/models"
import { ApiConfig as KompaktMetadata } from "devices/api-device/models"
import { DeviceInfoResponse as HarmonyMetadata } from "devices/harmony/models"
import { DeviceInfo as PureMetadata } from "devices/pure/models"

type ApiDeviceInfo = SerialPortDeviceInfo<SerialPortDeviceType.ApiDevice> & {
  metadata: KompaktMetadata
}

type PureDeviceInfo = SerialPortDeviceInfo<SerialPortDeviceType.Pure> & {
  metadata: PureMetadata
}

type HarmonyDeviceInfo = SerialPortDeviceInfo<SerialPortDeviceType.Harmony> & {
  metadata: HarmonyMetadata
}

type HarmonyMscDeviceInfo =
  SerialPortDeviceInfo<SerialPortDeviceType.HarmonyMsc> & {
    metadata: undefined
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
  drawerVisible: boolean
}
