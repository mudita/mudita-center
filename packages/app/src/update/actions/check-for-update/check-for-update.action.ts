/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { AppError } from "App/core/errors"
import { DeviceType } from "App/device/constants"
import isVersionGreater from "App/overview/helpers/is-version-greater"
import { Product, UpdateError, UpdateOsEvent } from "App/update/constants"
import { Release } from "App/update/dto"
import { versionFormatter } from "App/update/helpers"
import {
  getAllReleasesRequest,
  getLatestReleaseRequest,
} from "App/update/requests"
import { ReduxRootState, RootState } from "App/__deprecated__/renderer/store"

interface Params {
  deviceType: DeviceType
  isSilentCheck: boolean
}

interface Result {
  allReleases: Release[]
  releaseAvailableForUpdate: Release | null
}

export const checkForUpdate = createAsyncThunk<Result, Params>(
  UpdateOsEvent.CheckForUpdate,
  async ({ deviceType }, { rejectWithValue, getState }) => {
    const state = getState() as RootState & ReduxRootState

    const osVersion = versionFormatter(state.device.data?.osVersion || "")

    let releaseAvailableForUpdate: Release | undefined

    if (!osVersion) {
      return rejectWithValue(
        new AppError(UpdateError.CheckForUpdate, "Os version not found!")
      )
    }

    const latestRelease = await getLatestReleaseRequest(
      deviceType === DeviceType.MuditaPure
        ? Product.PurePhone
        : Product.BellHybrid
    )

    const allReleases = await getAllReleasesRequest(
      deviceType === DeviceType.MuditaPure
        ? Product.PurePhone
        : Product.BellHybrid
    )

    if (!latestRelease.ok || !latestRelease.data) {
      return rejectWithValue(
        new AppError(UpdateError.CheckForUpdate, "Latest release not found")
      )
    }

    if (!allReleases.ok || !allReleases.data) {
      return rejectWithValue(
        new AppError(UpdateError.CheckForUpdate, "All releases not found")
      )
    }

    if (!isVersionGreater(osVersion, latestRelease.data.version)) {
      releaseAvailableForUpdate = latestRelease.data
    }

    return {
      allReleases: allReleases.data,
      releaseAvailableForUpdate: releaseAvailableForUpdate ?? null,
    }
  }
)
