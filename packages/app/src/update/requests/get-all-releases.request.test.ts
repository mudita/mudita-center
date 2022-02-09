/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceType } from "@mudita/pure"
import { ipcRenderer } from "electron-better-ipc"
import { Release, IpcUpdate } from "App/update"
import { Product } from "App/main/constants"
import { getAllReleases } from "App/update/requests/get-all-releases.request"

const bellRelease: Release = {
  version: "1.0.0",
  date: "2021-02-16T13:39:18Z",
  prerelease: false,
  product: Product.BellHybrid,
  file: {
    url: "www.mudita.com/example-releases/1",
    name: "release-1",
    size: 9205760,
  },
}

const pureReleaseOne: Release = {
  version: "2.0.0",
  date: "2021-02-05T09:10:22Z",
  prerelease: false,
  product: Product.PurePhone,
  file: {
    url: "www.mudita.com/example-releases/2",
    name: "release-2",
    size: 9123840,
  },
}

const pureReleaseTwo: Release = {
  version: "3.0.0",
  date: "2021-01-28T10:44:33Z",
  prerelease: true,
  product: Product.PurePhone,
  file: {
    url: "www.mudita.com/example-releases/3",
    name: "release-2",
    size: 9082880,
  },
}

const releases: Release[] = [bellRelease, pureReleaseOne, pureReleaseTwo]

describe("Device: MuditaPure", () => {
  test("returns all releases and latestRelease for Mudita Pure correctly", async () => {
    ;(ipcRenderer as any).__rendererCalls = {
      [IpcUpdate.GetDevelopmentReleases]: releases,
    }
    const { allReleases, latestRelease } = await getAllReleases(
      DeviceType.MuditaPure
    )
    expect(allReleases).toStrictEqual([pureReleaseTwo, pureReleaseOne])
    expect(latestRelease).toStrictEqual(releases[1])
  })
})

describe("Device: MuditaHarmony", () => {
  test("returns all releases and latestRelease for Mudita Harmony correctly", async () => {
    ;(ipcRenderer as any).__rendererCalls = {
      [IpcUpdate.GetDevelopmentReleases]: releases,
    }
    const { allReleases, latestRelease } = await getAllReleases(
      DeviceType.MuditaHarmony
    )
    expect(allReleases).toStrictEqual([bellRelease])
    expect(latestRelease).toStrictEqual(bellRelease)
  })
})
