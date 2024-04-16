/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { AppError } from "Core/core/errors"
import { DeviceType } from "Core/device/constants"
import isVersionGreaterOrEqual from "Core/utils/is-version-greater-or-equal"
import {
  CheckForUpdateMode,
  Product,
  UpdateError,
  UpdateOsEvent,
} from "Core/update/constants"
import { OsRelease } from "Core/update/dto"
import { versionFormatter } from "Core/update/helpers"
import {
  getLatestReleaseRequest,
  getReleasesByVersions,
  osUpdateAlreadyDownloadedCheck,
} from "Core/update/requests"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { isActiveDeviceSet } from "Core/device-manager/selectors/is-active-device-set.selector"

interface Params {
  deviceType: DeviceType
  mode: CheckForUpdateMode
}

interface Result {
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

// TODO: The entire logic within checkForUpdate requires a comprehensive rewrite.
//  The current implementation surpasses the boundaries of even the most audacious imagination.
//  It's in dire need of restructuring and clarity.
//  The intricacies of what transpires here defy conventional understanding, prompting a thorough overhaul for better maintainability and comprehension.
export const checkForUpdate = createAsyncThunk<
  Result,
  Params,
  { state: ReduxRootState }
>(
  UpdateOsEvent.CheckForUpdate,
  async ({ deviceType }, { rejectWithValue, getState }) => {
    const state = getState()

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

    const latestReleaseResult = await getLatestReleaseRequest(
      product,
      state.device.data?.serialNumber
    )

    if (!latestReleaseResult.ok || !latestReleaseResult.data) {
      return rejectWithValue(
        new AppError(UpdateError.CheckForUpdate, "Latest release not found")
      )
    }

    if (isVersionGreaterOrEqual(osVersion, latestReleaseResult.data.version)) {
      const activeDeviceSet = isActiveDeviceSet(getState())

      if (!activeDeviceSet) {
        return rejectWithValue(new AppError(UpdateError.NoActiveDevice, ""))
      }

      return {
        availableReleasesForUpdate: [],
      }
    }

    const availableReleasesForUpdate: OsRelease[] = [latestReleaseResult.data]

    const mandatoryVersionsToInstall =
      latestReleaseResult.data.mandatoryVersions.filter(
        (version) => !isVersionGreaterOrEqual(osVersion, version)
      )

    if (mandatoryVersionsToInstall.length === 0) {
      const areAllReleasesAlreadyDownloaded = await areAllReleasesDownloaded(
        availableReleasesForUpdate
      )
      const activeDeviceSet = isActiveDeviceSet(getState())

      if (!activeDeviceSet) {
        return rejectWithValue(new AppError(UpdateError.NoActiveDevice, ""))
      }
      return {
        availableReleasesForUpdate,
        areAllReleasesAlreadyDownloaded,
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

    const areAllReleasesAlreadyDownloaded = await areAllReleasesDownloaded(
      availableReleasesForUpdate
    )
    const activeDeviceSet = isActiveDeviceSet(getState())

    if (!activeDeviceSet) {
      return rejectWithValue(new AppError(UpdateError.NoActiveDevice, ""))
    }

    return {
      availableReleasesForUpdate,
      areAllReleasesAlreadyDownloaded,
    }
  }
)
