/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { Feature, flags } from "Core/feature-flags"
import isVersionGreaterOrEqual from "Core/utils/is-version-greater-or-equal"
import { checkForUpdate } from "Core/update/actions/check-for-update/check-for-update.action"
import { CheckForUpdateMode, UpdateOsEvent } from "Core/update/constants"
import { versionFormatter } from "Core/update/helpers"
import { ReduxRootState, RootState } from "Core/__deprecated__/renderer/store"

export const checkForForceUpdateNeed = createAsyncThunk<boolean, void>(
  UpdateOsEvent.CheckForForceUpdate,
  (_, { getState, dispatch }) => {
    if (!flags.get(Feature.ForceUpdate)) {
      return false
    }

    const { device, settings } = getState() as RootState & ReduxRootState

    const osVersion = versionFormatter(device.data?.osVersion ?? "")
    const lowestSupportedProductVersion =
      settings.lowestSupportedVersions?.lowestSupportedProductVersion
    const deviceType = device.deviceType

    if (!osVersion || !lowestSupportedProductVersion || !deviceType) {
      return false
    }

    const osVersionSupported = isVersionGreaterOrEqual(
      osVersion,
      lowestSupportedProductVersion[deviceType]
    )

    if (!osVersionSupported) {
      void dispatch(
        checkForUpdate({
          deviceType,
          mode: CheckForUpdateMode.Normal,
        })
      )

      return true
    }

    return false
  }
)
