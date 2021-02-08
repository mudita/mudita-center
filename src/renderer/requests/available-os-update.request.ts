import { ipcRenderer } from "electron-better-ipc"
import {
  OsUpdateChannel,
  Release,
} from "App/main/functions/register-pure-os-update-listener"

interface AvailableReleases {
  allReleases: Release[]
  newerReleases: Release[]
}

const availableOsUpdateRequest = (
  osVersion?: string
): Promise<AvailableReleases> => {
  return new Promise(async (resolve, reject) => {
    try {
      const releases = await ipcRenderer.callMain<string, Release[]>(
        OsUpdateChannel.Request
      )

      let availableReleases: Release[] = []

      if (osVersion) {
        for (const release of releases) {
          if (
            osVersion.includes(release.version) ||
            release.version.includes(osVersion)
          ) {
            break
          } else {
            availableReleases.push(release)
          }
        }
      } else {
        availableReleases = releases
      }

      resolve({
        allReleases: releases,
        newerReleases: availableReleases
          .filter((release) => !release.prerelease)
          .reverse(),
      })
    } catch (error) {
      reject(error)
    }
  })
}

export default availableOsUpdateRequest
