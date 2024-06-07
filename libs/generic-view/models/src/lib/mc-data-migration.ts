/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

export enum DataMigrationFeature {
  Notes = "notes",
  Alarms = "alarms",
  CallLog = "callLog",
  Contacts = "contacts",
  Messages = "messages",
  Multimedia = "multimedia",
}

export enum DataMigrationProgressStep {
  CollectingData,
}

const dataValidator = z.undefined()

const configValidator = z.object({
  dataTypes: z.array(z.nativeEnum(DataMigrationFeature)),
})

export type McDataMigrationConfig = z.infer<typeof configValidator>

export const mcDataMigration = {
  key: "mc-data-migration",
  dataValidator,
  configValidator,
} as const
