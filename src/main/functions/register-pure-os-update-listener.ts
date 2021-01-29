import { ipcMain } from "electron-better-ipc"
import fetch from "node-fetch"

export enum OsUpdateChannel {
  Request = "os-update-request",
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
    browser_download_url: string
  }[]
}

export interface Release {
  version: string
  date: string
  prerelease: boolean
  file: {
    url: string
    size: number
  }
  devMode?: boolean
}

const osUpdateServerUrl = process.env.OS_UPDATE_SERVER

const registerPureOsUpdateListener = () => {
  if (osUpdateServerUrl) {
    ipcMain.answerRenderer(OsUpdateChannel.Request, async () => {
      const releases: GithubRelease[] = await (
        await fetch(osUpdateServerUrl)
      ).json()

      return releases
        .map((release) => {
          const {
            assets,
            tag_name,
            draft,
            prerelease,
            created_at,
            published_at,
          } = release
          const asset = assets.find(
            (asset) => asset.content_type === "application/x-tar"
          )
          if (asset && !draft) {
            return {
              version: tag_name,
              date: published_at || created_at,
              prerelease,
              file: {
                url: asset.browser_download_url,
                size: asset.size,
              },
            }
          } else {
            return null
          }
        })
        .filter((release) => release !== null)
    })
  }
}

export default registerPureOsUpdateListener
