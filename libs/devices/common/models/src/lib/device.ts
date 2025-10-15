/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ApiDevice } from "devices/api-device/models"
import { Harmony } from "devices/harmony/models"
import { Pure } from "devices/pure/models"
import { HarmonyMsc } from "devices/harmony-msc/models"

export type Device = Pick<
  ApiDevice | Harmony | HarmonyMsc | Pure,
  | "path"
  | "deviceType"
  | "serialNumber"
  | "deviceSubtype"
  | "id"
  | "vendorId"
  | "productId"
  | "otherProductIds"
  | "otherVendorIds"
>
