/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "reselect"
import { ReleaseProcessState } from "Core/update/constants"
import { UpdateOsState } from "Core/update/reducers/update-os.interface"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { updateStateSelector } from "Core/update/selectors/update-state-selector"

export const areAllReleasesDownloaded = createSelector<
  ReduxRootState,
  UpdateOsState,
  boolean
>(updateStateSelector, (state) => {
  const downloadedProcessedReleases = state.data.downloadedProcessedReleases
  return Boolean(
    downloadedProcessedReleases &&
      downloadedProcessedReleases.length > 0 &&
      downloadedProcessedReleases.every(
        (item) => item.state === ReleaseProcessState.Done
      )
  )
})
