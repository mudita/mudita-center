/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  GithubRelease,
  Release,
} from "App/main/functions/register-get-all-releases-listener"
import { isRelease } from "App/main/utils/is-release"

const mapToReleases = (githubReleases: GithubRelease[]): Release[] => {
  return githubReleases
    .map((release): Release | null => {
      const { assets, tag_name, draft, created_at, published_at } = release
      const asset = assets.find(
        (asset) => asset.content_type === "application/x-tar"
      )
      if (asset && !draft) {
        const version = tag_name.replace("daily-", "").replace("release-", "")

        return {
          version,
          date: published_at || created_at,
          prerelease: !isRelease(version),
          file: {
            url: asset.url,
            size: asset.size,
            name: asset.name,
          },
        }
      } else {
        return null
      }
    })
    .filter((release): release is Release => release !== null)
}

export default mapToReleases
