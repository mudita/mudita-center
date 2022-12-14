/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ReleaseProcessState } from "App/update/constants"
import { OsRelease } from "App/update/dto"
import { UpdateOsState } from "App/update/reducers/update-os.interface"
import { ReduxRootState } from "App/__deprecated__/renderer/store"
import { createSelector } from "reselect"

export const alreadyDownloadedReleasesSelector = createSelector<
  ReduxRootState,
  UpdateOsState,
  OsRelease[]
>(
  (state) => state.update,
  (state) => {
    return (state.data.downloadedProcessedReleases ?? [])
      .filter((item) => item.state === ReleaseProcessState.Done)
      .map((item) => item.release)
  }
)
