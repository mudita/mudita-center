/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcMain } from "electron-better-ipc"
import axios from "axios"
import logger from "App/main/utils/logger"
import mapToReleases from "App/main/utils/map-to-release"

export enum GetAllReleasesEvents {
  Request = "get-all-releases-request",
}

export interface GithubReleaseAsset {
  content_type: string
  size: number
  url: string
  name: string
}

export interface GithubRelease {
  tag_name: string
  created_at: string
  published_at: string
  draft: boolean
  prerelease: boolean
  assets: GithubReleaseAsset[]
}

export interface Release {
  version: string
  date: string
  prerelease: boolean
  file: {
    url: string
    name: string
    size: number
  }
  devMode?: boolean
}

const osUpdateServerUrl = process.env.OS_UPDATE_SERVER

// It's required only for development when API rate limits may exceed
// https://docs.github.com/en/rest/overview/resources-in-the-rest-api#rate-limiting
const githubToken = process.env.OS_UPDATE_SERVER_ACCESS_TOKEN

const releasesRequest = async (
  page = 1,
  perPage = 100
): Promise<GithubRelease[]> => {
  try {
    const response = await axios(osUpdateServerUrl || "", {
      headers: {
        ...(githubToken ? { Authorization: `token ${githubToken}` } : {}),
      },
      params: {
        page: page,
        per_page: perPage,
      },
    })
    return response.data
  } catch (error) {
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

const registerGetAllReleasesListener = () => {
  if (osUpdateServerUrl) {
    ipcMain.answerRenderer(GetAllReleasesEvents.Request, async () => {
      let releases: GithubRelease[] = []
      let retry = true
      let page = 1

      do {
        const newReleases = await releasesRequest(page)
        if (newReleases.length === 0) {
          retry = false
        } else {
          releases = [...releases, ...newReleases]
          page++
        }
      } while (retry)

      return mapToReleases(releases).sort((a, b) => {
        const versionA = (a as Release).version
        const versionB = (b as Release).version

        return versionB.localeCompare(versionA, undefined, {
          numeric: true,
          sensitivity: "base",
        })
      })
    })
  }
}

export default registerGetAllReleasesListener
