/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcMain } from "electron-better-ipc"
import axios from "axios"
import logger from "App/main/utils/logger"
import { isRelease } from "App/main/utils/is-release"

export enum GetAllReleasesEvents {
  Request = "get-all-releases-request",
}

interface GithubRelease {
  tag_name: string
  created_at: string
  published_at: string
  draft: boolean
  prerelease: boolean
  assets: {
    content_type: string
    size: number
    url: string
    name: string
  }[]
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
    logger.error(
      `Checking for OS updated failed with code ${error.response.status}: ${error.response.statusText}`
    )
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

      return releases
        .map((release): Release | null => {
          const { assets, tag_name, draft, created_at, published_at } = release
          const asset = assets.find(
            (asset) => asset.content_type === "application/x-tar"
          )
          if (asset && !draft) {
            // slice 'release-' prefix from tag_name
            const version = tag_name.slice(8)
            return {
              version,
              date: published_at || created_at,
              prerelease: !isRelease(version),
              file: {
                url: asset.url,
                size: asset.size,
                name: asset.name,
              },
            }
          } else {
            return null
          }
        })
        .filter((release) => release !== null)
        .sort((a, b) => {
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
