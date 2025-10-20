/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import semver from "semver"
import { cloneDeep, merge } from "lodash"
import { MigrationData, Migrations } from "app-utils/models"

type BaseData = Omit<MigrationData, "_metadata">

export class MigrationService<FinalData extends BaseData> {
  private currentData: MigrationData

  constructor(
    private migrations: Migrations,
    currentData: BaseData
  ) {
    const data = cloneDeep(currentData)
    if (!data._metadata) {
      merge(data, {
        _metadata: {
          lastMigratedVersion: null,
        },
      })
    }
    this.currentData = data as MigrationData
  }

  migrate() {
    const migrations = Object.entries(this.migrations)
      .filter(([version]) => {
        if (
          !this.currentData._metadata ||
          this.currentData._metadata.lastMigratedVersion === null
        ) {
          // If lastMigratedVersion is unknown, we consider it a legacy version and run all migrations
          return true
        }
        return semver.gt(
          version,
          this.currentData._metadata.lastMigratedVersion
        )
      })
      .sort(([aVersion], [bVersion]) => semver.compare(aVersion, bVersion))

    for (const [version, migration] of migrations) {
      this.currentData = merge({}, migration(this.currentData), {
        _metadata: {
          lastMigratedVersion: version,
        },
      })
    }
    return this.currentData as FinalData
  }
}
