/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceType } from "@mudita/pure"
import { ipcRenderer } from "electron-better-ipc"
import { IpcUpdate } from "App/__deprecated__/update/constants"
import { Product, ReleaseSpace } from "App/__deprecated__/main/constants"
import { Release } from "App/__deprecated__/update/types"
import { Feature, flags } from "App/feature-flags"
import { getLatestProductionReleaseParams } from "App/__deprecated__/api/mudita-center-server/client"

const productsMapper = {
  [DeviceType.MuditaPure]: Product.PurePhone,
  [DeviceType.MuditaHarmony]: Product.BellHybrid,
}

// TODO Merge development and test-production spaces on MC as long as in Release Copier
const getReleaseSpace = (): ReleaseSpace => {
  if (flags.get(Feature.ProductionReleasesOnly)) {
    return ReleaseSpace.ProductionReleases
  } else if (flags.get(Feature.PreReleasesOnly)) {
    return ReleaseSpace.PreReleases
  }

  return ReleaseSpace.DailyReleases
}

export const getLatestReleaseRequest = async (
  deviceType: DeviceType
): Promise<Release | undefined> => {
  const product = productsMapper[deviceType]
  const releaseSpace = getReleaseSpace()
  const params: getLatestProductionReleaseParams = {
    product,
    releaseSpace,
  }

  return ipcRenderer.callMain<getLatestProductionReleaseParams, Release>(
    IpcUpdate.GetLatestRelease,
    params
  )
}
