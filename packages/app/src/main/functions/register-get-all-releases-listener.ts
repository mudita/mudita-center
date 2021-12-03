/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcMain } from "electron-better-ipc"
import { githubInstance } from "App/main/utils/github-instance"
import logger from "App/main/utils/logger"
import { Product } from "App/main/constants"
import mapToReleases from "App/main/utils/map-to-release"

export enum GetAllReleasesEvents {
  Request = "get-all-releases-request",
}

export interface GithubReleaseAsset {
  content_type: string
  size: number
  url: string
  name: string
  browser_download_url: string
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
  product: Product
  file: {
    url: string
    name: string
    size: number
  }
  devMode?: boolean
}

export interface ManifestReleases {
  version: string
  platform: string
  target: Product
  options: string
  files: {
    tar: string
    image: string
  }
  checksums: Record<string, string>
}

const osUpdateServerUrl = process.env.OS_UPDATE_SERVER

const releasesRequest = async (
  page = 1,
  perPage = 100
): Promise<GithubRelease[]> => {
  try {
    const response = await githubInstance(osUpdateServerUrl || "", {
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

export default registerGetAllReleasesListener
