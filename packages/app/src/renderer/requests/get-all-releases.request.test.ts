/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { GetAllReleasesEvents } from "App/main/functions/register-get-all-releases-listener"
import getAllReleases from "Renderer/requests/get-all-releases.request"

const releases = [
  {
    version: "1",
    date: "2021-02-16T13:39:18Z",
    prerelease: false,
    file: {
      url: "www.mudita.com/example-releases/1",
      size: 9205760,
    },
  },
  {
    version: "2",
    date: "2021-02-05T09:10:22Z",
    prerelease: false,
    file: {
      url: "www.mudita.com/example-releases/2",
      size: 9123840,
    },
  },
  {
    version: "3",
    date: "2021-01-28T10:44:33Z",
    prerelease: true,
    file: {
      url: "www.mudita.com/example-releases/3",
      size: 9082880,
    },
  },
]

test("returns all releases and latestRelease correctly", async () => {
  ;(ipcRenderer as any).__rendererCalls = {
    [GetAllReleasesEvents.Request]: releases,
  }
  const { allReleases, latestRelease } = await getAllReleases()
  expect(allReleases).toStrictEqual(releases)
  expect(latestRelease).toStrictEqual(releases[0])
})
