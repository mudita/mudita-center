/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DevicesQueryKeys } from "devices/common/models"

export const harmonyQueryKeys = {
  _device: (path?: string) => [DevicesQueryKeys.All, path],
  time: (path?: string) => [...harmonyQueryKeys._device(path), "time"],
  fileList: (path?: string) => [...harmonyQueryKeys._device(path), "fileList"],
}
