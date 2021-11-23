/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import semver from "semver/preload"
import { DeviceType } from "@mudita/pure"
import { ipcRenderer } from "electron-better-ipc"
import {
  GetAllReleasesEvents,
  Release,
} from "App/main/functions/register-get-all-releases-listener"
import { Product } from "App/main/constants"

interface AllReleasesResponse {
  allReleases: Release[]
  latestRelease: Release | undefined
}

const productsMapper = {
  [DeviceType.MuditaPure]: Product.PurePhone,
  [DeviceType.MuditaHarmony]: Product.BellHybrid,
}

const getAllReleases = async (
  deviceType: DeviceType
): Promise<AllReleasesResponse> => {
  const releases: Release[] = await ipcRenderer.callMain<undefined, Release[]>(
    GetAllReleasesEvents.Request
  )

  const filteredProducts = releases
    .sort((prev: Release, next: Release) => {
      if (semver.gtr(prev.version, next.version)) {
        return -1
      }

      if (semver.ltr(prev.version, next.version)) {
        return 1
      }

      return 0
    })
    .filter((release) => release.product === productsMapper[deviceType])
  const officialReleases = filteredProducts.filter(
    (release) => !release.prerelease
  )
  const newestOfficialRelease = officialReleases[0]

  return {
    allReleases: filteredProducts,
    latestRelease: newestOfficialRelease,
  }
}

export default getAllReleases
