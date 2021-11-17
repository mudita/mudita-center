/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { githubInstance } from "App/main/utils/github-instance"
import {
  GithubRelease,
  GithubReleaseAsset,
  Release,
  ManifestReleases,
} from "App/main/functions/register-get-all-releases-listener"
import { Product } from "App/main/constants"
import OsReleasesManager from "App/main/utils/os-releases-manager"
import isVersionMatch from "App/overview/helpers/is-version-match"
import isPrereleaseSet from "App/overview/helpers/is-prerelease-set"
import getPrereleaseLabels from "App/overview/helpers/get-prerelease-labels"

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

export const isProductionRelease = (release: GithubRelease): boolean => {
  if (release.prerelease) {
    return false
  }

  if (isPrereleaseSet(getVersion(release.tag_name))) {
    return false
  }

  return true
}

export const isTestProductionRelease = (release: GithubRelease): boolean => {
  const labels = getPrereleaseLabels(getVersion(release.tag_name))

  if (labels.length === 0) {
    return true
  }

  if (labels[0] !== "rc") {
    return false
  }

  if (typeof labels[1] !== "number") {
    return false
  }

  return true
}
export const isProductionAlphaRelease = (release: GithubRelease): boolean => {
  const labels = getPrereleaseLabels(getVersion(release.tag_name))

  if (labels.length !== 1) {
    return false
  }

  if (labels[0] !== "alpha") {
    return false
  }

  return true
}
export const isTestProductionAlphaRelease = (
  release: GithubRelease
): boolean => {
  const labels = getPrereleaseLabels(getVersion(release.tag_name))

  if (labels[0] !== "alpha") {
    return false
  }

  if (typeof labels[1] !== "number") {
    return false
  }
  return true
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

  if (
    OsReleasesManager.isProductionAvailable() &&
    isProductionRelease(release)
  ) {
    return true
  }

  if (
    OsReleasesManager.isTestProductionAvailable() &&
    isTestProductionRelease(release)
  ) {
    return true
  }

  if (
    OsReleasesManager.isProductionAlphaAvailable() &&
    isProductionAlphaRelease(release)
  ) {
    return true
  }

  if (
    OsReleasesManager.isTestProductionAlphaAvailable() &&
    isTestProductionAlphaRelease(release)
  ) {
    return true
  }

  return false
}

export const getPrerelease = (release: GithubRelease): boolean => {
  return ![
    isProductionRelease,
    isTestProductionRelease,
    isProductionAlphaRelease,
    isTestProductionAlphaRelease,
  ].some((fn) => fn(release))
}

const mapToReleases = async (
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
              url: releaseFile?.url,
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
              url: asset.url,
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

export default mapToReleases
