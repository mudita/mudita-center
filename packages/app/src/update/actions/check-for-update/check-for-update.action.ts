/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { AppError } from "App/core/errors"
import { DeviceType } from "App/device/constants"
import isVersionGreaterOrEqual from "App/overview/helpers/is-version-greater-or-equal"
import {
  CheckForUpdateMode,
  Product,
  UpdateError,
  UpdateOsEvent,
} from "App/update/constants"
import { OsRelease } from "App/update/dto"
import { versionFormatter } from "App/update/helpers"
import {
  getAllReleasesRequest,
  getLatestReleaseRequest,
  getReleasesByVersions,
  osUpdateAlreadyDownloadedCheck,
} from "App/update/requests"
import { ReduxRootState, RootState } from "App/__deprecated__/renderer/store"

interface Params {
  deviceType: DeviceType
  mode: CheckForUpdateMode
}

interface Result {
  allReleases: OsRelease[]
  availableReleasesForUpdate: OsRelease[]
  areAllReleasesAlreadyDownloaded?: boolean
}

const areAllReleasesDownloaded = async (
  releases: OsRelease[]
): Promise<boolean> => {
  const result = await Promise.all(
    releases.map((release) => osUpdateAlreadyDownloadedCheck(release.file))
  )

  return result.every(Boolean)
}

export const checkForUpdate = createAsyncThunk<Result, Params>(
  UpdateOsEvent.CheckForUpdate,
  async ({ deviceType }, { rejectWithValue, getState }) => {
    const state = getState() as RootState & ReduxRootState

    const osVersion = versionFormatter(state.device.data?.osVersion || "")

    const product =
      deviceType === DeviceType.MuditaPure
        ? Product.PurePhone
        : Product.BellHybrid

    if (!osVersion) {
      return rejectWithValue(
        new AppError(UpdateError.CheckForUpdate, "Os version not found!")
      )
    }

    const latestReleaseResult = await getLatestReleaseRequest(product)
    const allReleasesResult = await getAllReleasesRequest(product)

    if (!latestReleaseResult.ok || !latestReleaseResult.data) {
      return rejectWithValue(
        new AppError(UpdateError.CheckForUpdate, "Latest release not found")
      )
    }

    const allReleases =
      allReleasesResult.ok && allReleasesResult.data
        ? allReleasesResult.data
        : []

    if (isVersionGreaterOrEqual(osVersion, latestReleaseResult.data.version)) {
      return {
        allReleases,
        availableReleasesForUpdate: [],
      }
    }

    const availableReleasesForUpdate = [latestReleaseResult.data]

    const mandatoryVersionsToInstall =
      latestReleaseResult.data.mandatoryVersions.filter(
        (version) => !isVersionGreaterOrEqual(osVersion, version)
      )

    if (mandatoryVersionsToInstall.length === 0) {
      return {
        allReleases,
        availableReleasesForUpdate,
        areAllReleasesAlreadyDownloaded: await areAllReleasesDownloaded(
          availableReleasesForUpdate
        ),
      }
    }

    const mandatoryReleasesToInstall = await getReleasesByVersions({
      product,
      versions: mandatoryVersionsToInstall,
    })

    if (!mandatoryReleasesToInstall.ok || !mandatoryReleasesToInstall.data) {
      return rejectWithValue(
        new AppError(UpdateError.CheckForUpdate, "Mandatory releases not found")
      )
    }

    availableReleasesForUpdate.unshift(...mandatoryReleasesToInstall.data)

    return {
      allReleases,
      availableReleasesForUpdate,
      areAllReleasesAlreadyDownloaded: await areAllReleasesDownloaded(
        availableReleasesForUpdate
      ),
    }
  }
)
