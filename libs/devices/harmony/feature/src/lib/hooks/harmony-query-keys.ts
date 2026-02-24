/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DevicesQueryKeys } from "devices/common/models"
import { HarmonyDirectory } from "devices/harmony/models"

export const harmonyQueryKeys = {
  _device: (id?: string) => [DevicesQueryKeys.All, id],
  time: (id?: string) => [...harmonyQueryKeys._device(id), "time"],
  osUpdateInfo: (id?: string) => [
    ...harmonyQueryKeys._device(id),
    "osUpdateInfo",
  ],
  fileList: (directory: HarmonyDirectory, id?: string) => [
    ...harmonyQueryKeys._device(id),
    "fileList",
    directory,
  ],
  newCrashDumps: (id?: string) => [
    ...harmonyQueryKeys._device(id),
    "new-crash-dumps",
  ],
  quotationList: (id?: string) => [
    ...harmonyQueryKeys._device(id),
    "quotationList",
  ],
  settings: (id?: string) => [...harmonyQueryKeys._device(id), "settings"],
}
