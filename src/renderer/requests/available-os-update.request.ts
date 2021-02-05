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

      resolve({
        allReleases: releases.reverse(),
        latestRelease: !osVersion?.includes(releases[0].version)
          ? releases[0]
          : null,
      })
    } catch (error) {
      reject(error)
    }
  })
}

export default availableOsUpdateRequest
