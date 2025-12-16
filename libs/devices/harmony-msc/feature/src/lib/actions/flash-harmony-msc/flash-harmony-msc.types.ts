/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  HarmonyMsc,
  HarmonyMscProcessProgressHandler,
} from "devices/harmony-msc/models"

export interface flashHarmonyMscParams {
  device: HarmonyMsc
  signal: AbortSignal
  onProgress?: HarmonyMscProcessProgressHandler
}
