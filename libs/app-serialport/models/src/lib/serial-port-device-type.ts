/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Product } from "app-utils/models"

export enum SerialPortDeviceType {
  ApiDevice = "ApiDevice",
  Harmony = Product.Harmony,
  HarmonyMsc = Product.HarmonyMsc,
  Pure = Product.Pure,
}

export enum SerialPortDeviceSubtype {
  Kompakt = Product.Kompakt,
}
