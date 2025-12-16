/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  SerialPortDeviceInfo,
  SerialPortDeviceType,
} from "app-serialport/models"
import { AppFileSystemScope } from "app-utils/models"

export type HarmonyMsc = SerialPortDeviceInfo<SerialPortDeviceType.HarmonyMsc>

export const MSC_HARMONY_SCOPE: AppFileSystemScope = "userData" as const
export const MSC_HARMONY_SCOPE_CATALOG_DIR = "msc-harmony" as const
