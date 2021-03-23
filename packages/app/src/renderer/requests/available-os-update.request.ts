/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import {
  OsUpdateChannel,
  Release,
} from "App/main/functions/register-pure-os-update-listener"

interface AvailableReleases {
  allReleases: Release[]
  latestRelease: Release | null
}

const availableOsUpdateRequest = async (
  osVersion?: string
): Promise<AvailableReleases> => {
  const releases: Release[] = await ipcRenderer.callMain<string, Release[]>(
    OsUpdateChannel.Request
  )

  const officialReleases = releases.filter((release) => !release.prerelease)
  const newestOfficialRelease = officialReleases[0]

  const updateAvailable =
    osVersion &&
    newestOfficialRelease &&
    !(
      osVersion.includes(newestOfficialRelease.version) ||
      newestOfficialRelease.version.includes(osVersion)
    )
  return {
    allReleases: releases,
    latestRelease: updateAvailable ? newestOfficialRelease : null,
  }
}

export default availableOsUpdateRequest
