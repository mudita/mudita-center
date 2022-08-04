/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcMain } from "electron-better-ipc"
import { githubInstance } from "App/__deprecated__/main/utils/github-instance"
import logger from "App/__deprecated__/main/utils/logger"

import { mapToReleases } from "App/__deprecated__/update/helpers"
import { IpcUpdate } from "App/__deprecated__/update/constants"
import { GithubRelease } from "App/__deprecated__/update/types"

const osUpdateServerUrl = process.env.OS_UPDATE_SERVER ?? ""

const releasesRequest = async (
  page = 1,
  perPage = 100
): Promise<GithubRelease[]> => {
  try {
    const response = await githubInstance(osUpdateServerUrl, {
      params: {
        page: page,
        per_page: perPage,
      },
    })
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return response.data
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (error.response) {
      logger.error(
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions, @typescript-eslint/no-unsafe-member-access
        `Checking for OS updated failed with code ${error.response.status}: ${error.response.statusText}`
      )
    } else {
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions, @typescript-eslint/no-unsafe-member-access
      logger.error(`Checking for OS updated failed: ${error.message}`)
    }
    return []
  }
}

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const registerGetAllReleasesListener = () => {
  if (osUpdateServerUrl) {
    ipcMain.answerRenderer(IpcUpdate.GetAllReleases, async () => {
      let releases: GithubRelease[] = []
      let retry = true
      let page = 1

      do {
        const newReleases = await releasesRequest(page)
        if (newReleases.length === 0 || releases.length > 30) {
          retry = false
        } else {
          releases = [...releases, ...newReleases]
          page++
        }
      } while (retry)

      const mappedReleases = await mapToReleases(releases)

      return mappedReleases.sort((a, b) => {
        const versionA = a.version
        const versionB = b.version

        return versionB.localeCompare(versionA, undefined, {
          numeric: true,
          sensitivity: "base",
        })
      })
    })
  }
}
