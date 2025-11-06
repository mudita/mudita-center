/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export type Version = string
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type MigrationData<T extends Record<string, any> = Record<string, any>> =
  T & {
    _metadata?: {
      lastMigratedVersion: Version | null
    }
  }
type Migration = (data: MigrationData) => MigrationData
export type Migrations = Record<Version, Migration>
