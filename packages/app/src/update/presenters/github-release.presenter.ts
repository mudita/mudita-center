/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { prerelease } from "semver"
import { ReleaseManifest, Release } from "App/update/dto"
import { ReleaseType } from "App/update/constants"
import { versionFormatter } from "App/update/helpers"

export class GithubReleasePresenter {
  static toRelease(item: ReleaseManifest): Release {
    const version = versionFormatter(item.version)
    const releaseType = prerelease(version)

    return {
      version,
      type: releaseType
        ? (releaseType[0] as ReleaseType)
        : ReleaseType.Production,
      date: item.date,
      product: item.product,
      file: {
        url: item.file.url,
        size: item.file.size,
        name: item.file.name,
      },
    }
  }
}
