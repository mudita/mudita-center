import { ipcRenderer } from "electron-better-ipc"
import {
  OsUpdateChannel,
  Release,
} from "App/main/functions/register-pure-os-update-listener"

interface AvailableReleases {
  allReleases: Release[]
  latestRelease: Release | null
}

const availableOsUpdateRequest = (
  osVersion?: string
): Promise<AvailableReleases> => {
  return new Promise(async (resolve, reject) => {
    try {
      const releases = await ipcRenderer.callMain<string, Release[]>(
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

      resolve({
        allReleases: releases,
        latestRelease: updateAvailable ? newestOfficialRelease : null,
      })
    } catch (error) {
      reject(error)
    }
  })
}

export default availableOsUpdateRequest
