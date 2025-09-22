/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DevicesQueryKeys } from "devices/common/models"
import { HarmonyDirectory } from "devices/harmony/models"

export const harmonyQueryKeys = {
  _device: (path?: string) => [DevicesQueryKeys.All, path],
  time: (path?: string) => [...harmonyQueryKeys._device(path), "time"],
  osUpdateInfo: (id?: string) => [
    ...harmonyQueryKeys._device(id),
    "osUpdateInfo",
  ],
  fileList: (directory: HarmonyDirectory, path?: string) => [
    ...harmonyQueryKeys._device(path),
    "fileList",
    directory,
  ],
}
