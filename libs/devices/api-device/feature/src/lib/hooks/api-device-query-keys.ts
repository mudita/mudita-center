/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DevicesQueryKeys } from "devices/common/models"

export const apiDeviceQueryKeys = {
  _device: (id?: string) => [DevicesQueryKeys.All, id],
  feature: (feature: string, id?: string) => [
    ...apiDeviceQueryKeys._device(id),
    "feature",
    feature,
  ],
  entitiesData: (entityType: string, id?: string) => [
    ...apiDeviceQueryKeys._device(id),
    "entitiesData",
    entityType,
  ],
  backups: (id?: string) => [...apiDeviceQueryKeys._device(id), "backups"],
}
