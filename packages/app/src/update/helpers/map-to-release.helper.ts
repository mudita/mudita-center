/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Product } from "App/main/constants"
import { githubInstance } from "App/main/utils/github-instance"
import {
  Release,
  GithubReleaseAsset,
  GithubRelease,
  ManifestReleases,
} from "App/update/types"
import isVersionMatch from "App/overview/helpers/is-version-match"
import isPrereleaseSet from "App/overview/helpers/is-prerelease-set"

export const isDraft = ({ draft }: GithubRelease): boolean => draft

export const findXTarAsset = ({
  assets,
}: GithubRelease): GithubReleaseAsset | undefined =>
  assets.find((asset) => asset.content_type === "application/x-tar")

export const findManifestAsset = ({
  assets,
}: GithubRelease): GithubReleaseAsset | undefined =>
  assets.find((asset) => asset.name === "manifest.json")

export const findAssetByName = (
  { assets }: GithubRelease,
  name: string
): GithubReleaseAsset | undefined => assets.find((asset) => asset.name === name)

export const getVersion = (tagName: string): string => {
  const [version] = tagName.split("_").reverse()
  return version
}

export const filterRelease = (release: GithubRelease): boolean => {
  if (isDraft(release)) {
    return false
  }
  if (findXTarAsset(release) === undefined) {
    return false
  }

  if (!isVersionMatch(release.tag_name)) {
    return false
  }

  return true
}

export const getPrerelease = (release: GithubRelease): boolean => {
  if (release.prerelease) {
    return true
  }

  if (isPrereleaseSet(getVersion(release.tag_name))) {
    return true
  }

  return false
}

export const mapToReleases = async (
  githubReleases: GithubRelease[]
): Promise<Release[]> => {
  const result = await Promise.all(
    githubReleases.filter(filterRelease).flatMap(async (release) => {
      const { tag_name, created_at, published_at } = release
      const manifest = findManifestAsset(release) as GithubReleaseAsset

      if (manifest) {
        const { data } = await githubInstance.get<{
          releases: ManifestReleases[]
        }>(manifest.url, {
          headers: {
            Accept: "application/octet-stream",
          },
        })

        return data.releases.flatMap((item) => {
          const releaseFile = findAssetByName(
            release,
            item.files.tar
          ) as GithubReleaseAsset

          return {
            version: getVersion(item.version),
            prerelease: getPrerelease(release),
            date: published_at || created_at,
            product: item.target,
            file: {
              url: releaseFile?.browser_download_url,
              size: releaseFile?.size,
              name: releaseFile?.name,
            },
          }
        })
      } else {
        // Used for legacy releases flow
        const asset = findXTarAsset(release) as GithubReleaseAsset

        return [
          {
            version: tag_name,
            prerelease: getPrerelease(release),
            date: published_at || created_at,
            product: Product.PurePhone,
            file: {
              url: asset.browser_download_url,
              size: asset.size,
              name: asset.name,
            },
          },
        ]
      }
    })
  )

  return result.flat()
}
