/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcMain } from "electron-better-ipc"
import { githubInstance } from "App/main/utils/github-instance"
import logger from "App/main/utils/logger"

import { mapToReleases } from "App/update/helpers"
import { IpcUpdate } from "App/update/constants"
import { GithubRelease } from "App/update/types"

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
    return response.data
  } catch (error: any) {
    if (error.response) {
      logger.error(
        `Checking for OS updated failed with code ${error.response.status}: ${error.response.statusText}`
      )
    } else {
      logger.error(`Checking for OS updated failed: ${error.message}`)
    }
    return []
  }
}

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
