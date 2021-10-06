/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  GithubRelease,
  GithubReleaseAsset,
  Release,
} from "App/main/functions/register-get-all-releases-listener"
import OsReleasesManager from "App/main/utils/os-releases-manager"
import isVersionMatch from "App/overview/helpers/is-version-match"
import isPrereleaseSet from "App/overview/helpers/is-prerelease-set"
import getPrereleaseLabels from "App/overview/helpers/get-prerelease-labels"

export const isDraft = ({ draft }: GithubRelease): boolean => draft

export const findXTarAsset = ({
  assets,
}: GithubRelease): GithubReleaseAsset | undefined =>
  assets.find((asset) => asset.content_type === "application/x-tar")

export const isProductionRelease = (release: GithubRelease): boolean => {
  if (release.prerelease) {
    return false
  }

  if (isPrereleaseSet(release.tag_name)) {
    return false
  }

  return true
}

export const isTestProductionRelease = (release: GithubRelease): boolean => {
  const labels = getPrereleaseLabels(release.tag_name)

  if (labels[0] !== "rc") {
    return false
  }

  if (typeof labels[1] !== "number") {
    return false
  }

  return true
}
export const isProductionAlphaRelease = (release: GithubRelease): boolean => {
  const labels = getPrereleaseLabels(release.tag_name)

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
  const labels = getPrereleaseLabels(release.tag_name)

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

  if (OsReleasesManager.isProductionAvailable() && isProductionRelease(release)) {
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

const mapToReleases = (githubReleases: GithubRelease[]): Release[] => {
  return githubReleases.filter(filterRelease).map((release): Release => {
    const { tag_name, created_at, published_at } = release

    const asset = findXTarAsset(release) as GithubReleaseAsset

    return {
      version: tag_name,
      prerelease: getPrerelease(release),
      date: published_at || created_at,
      file: {
        url: asset.url,
        size: asset.size,
        name: asset.name,
      },
    }
  })
}

export default mapToReleases
