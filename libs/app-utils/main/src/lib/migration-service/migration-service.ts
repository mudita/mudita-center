/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import semver from "semver"

export type Version = string
type MigrationData = Record<string, unknown>
type Migration = (data: MigrationData) => MigrationData
export type Migrations = Record<Version, Migration>

export class MigrationService<FinalData extends MigrationData> {
  private readonly migrations: Migration[]
  private currentData: MigrationData

  constructor(
    migrations: Migrations,
    currentData: MigrationData,
    currentVersion: string,
    targetVersion: string
  ) {
    this.migrations = this.initMigrations(
      migrations,
      currentVersion,
      targetVersion
    )
    this.currentData = currentData
  }

  private initMigrations(
    migrations: Migrations,
    currentVersion: string,
    targetVersion: string
  ) {
    const sortedVersions = semver.sort(Object.keys(migrations))
    const versions = sortedVersions.filter((version) => {
      return version > currentVersion && version <= targetVersion
    })
    return versions.map((version) => migrations[version])
  }

  migrate() {
    for (const migration of this.migrations) {
      this.currentData = migration(this.currentData)
    }
    return this.currentData as FinalData
  }
}
