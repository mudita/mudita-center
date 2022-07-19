/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceType } from "@mudita/pure"
import { ipcRenderer } from "electron-better-ipc"
import { Release, IpcUpdate } from "App/__deprecated__/update"
import { Product } from "App/__deprecated__/main/constants"
import { getLatestReleaseRequest } from "App/__deprecated__/update/requests/get-latest-release.request"
import { flags } from "App/feature-flags"

jest.mock("App/feature-flags")

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
const prodPureRelease: Release = pureReleaseOne
const prodBellRelease: Release = bellRelease

describe("Environment: production", () => {
  describe("Device: MuditaPure", () => {
    test("returns latestRelease for Mudita Pure correctly", async () => {
      jest.spyOn(flags, "get").mockReturnValueOnce(true)
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
      ;(ipcRenderer as any).__rendererCalls = {
        [IpcUpdate.GetLatestRelease]: prodPureRelease,
      }
      const latestRelease = await getLatestReleaseRequest(DeviceType.MuditaPure)
      expect(latestRelease).toStrictEqual(pureReleaseOne)
    })
  })

  describe("Device: MuditaHarmony", () => {
    test("returns latestRelease for Mudita Harmony correctly", async () => {
      jest.spyOn(flags, "get").mockReturnValueOnce(true)
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
      ;(ipcRenderer as any).__rendererCalls = {
        [IpcUpdate.GetLatestRelease]: prodBellRelease,
      }
      const latestRelease = await getLatestReleaseRequest(
        DeviceType.MuditaHarmony
      )
      expect(latestRelease).toStrictEqual(bellRelease)
    })
  })
})
