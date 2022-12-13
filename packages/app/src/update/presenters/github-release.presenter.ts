/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { prerelease } from "semver"
import { ReleaseManifest, OsRelease } from "App/update/dto"
import { OsReleaseType } from "App/update/constants"
import { versionFormatter } from "App/update/helpers"

export class GithubReleasePresenter {
  static toRelease(item: ReleaseManifest): OsRelease {
    const version = versionFormatter(item.version)
    const releaseType = prerelease(version)

    return {
      version,
      type: releaseType
        ? (releaseType[0] as OsReleaseType)
        : OsReleaseType.Production,
      date: item.date,
      product: item.product,
      file: {
        url: item.file.url,
        size: +item.file.size,
        name: item.file.name,
      },
      mandatoryVersions: item.mandatoryVersions,
    }
  }
}
