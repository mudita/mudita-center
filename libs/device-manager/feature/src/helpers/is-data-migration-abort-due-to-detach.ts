/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceBaseProperties } from "device-protocol/models"
import { DataMigrationStatus } from "generic-view/store"

export const isDataMigrationAbortDueToDetach = (
  events: DeviceBaseProperties[],
  migrationStatus: DataMigrationStatus,
  sourceDevice: { serialNumber: string } | undefined,
  targetDevice: { serialNumber: string } | undefined
): boolean => {
  return events.some(
    (event) =>
      ![
        DataMigrationStatus.Cancelled,
        DataMigrationStatus.Failed,
        DataMigrationStatus.Completed,
        DataMigrationStatus.Idle,
      ].includes(migrationStatus) &&
      (sourceDevice?.serialNumber === event.serialNumber ||
        targetDevice?.serialNumber === event.serialNumber)
  )
}
