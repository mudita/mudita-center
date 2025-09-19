/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DevicesQueryKeys } from "devices/common/models"

export const harmonyQueryKeys = {
  _device: (id?: string) => [DevicesQueryKeys.All, id],
  time: (id?: string) => [...harmonyQueryKeys._device(id), "time"],
  osUpdateInfo: (id?: string) => [
    ...harmonyQueryKeys._device(id),
    "osUpdateInfo",
  ],
}
