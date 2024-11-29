/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceBaseProperties, DeviceType } from "device-protocol/models"
import { DataMigrationStatus } from "generic-view/store"

export const shouldSkipProcessingForDetachedPure = (
  events: DeviceBaseProperties[],
  migrationStatus: DataMigrationStatus,
  sourceDevice: { serialNumber: string } | undefined
) => {
  return events.some(
    (event) =>
      event.deviceType === DeviceType.MuditaPure &&
      event.serialNumber === sourceDevice?.serialNumber &&
      [
        DataMigrationStatus.PureDatabaseCreating,
        DataMigrationStatus.PureDatabaseIndexing,
      ].includes(migrationStatus)
  )
}
