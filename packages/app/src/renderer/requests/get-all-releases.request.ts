/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import {
  GetAllReleasesEvents,
  Release,
} from "App/main/functions/register-get-all-releases-listener"

interface AllReleasesResponse {
  allReleases: Release[]
  latestRelease: Release | undefined
}

const getAllReleases = async (): Promise<AllReleasesResponse> => {
  const releases: Release[] = await ipcRenderer.callMain<undefined, Release[]>(
    GetAllReleasesEvents.Request
  )

  const officialReleases = releases.filter((release) => !release.prerelease)
  const newestOfficialRelease = officialReleases[0]

  return {
    allReleases: releases,
    latestRelease: newestOfficialRelease,
  }
}

export default getAllReleases
