/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "reselect"
import { ReleaseProcessState } from "App/update/constants"
import { UpdateOsState } from "App/update/reducers/update-os.interface"
import { ReduxRootState } from "App/__deprecated__/renderer/store"
import { updateStateSelector } from "App/update/selectors/update-state-selector"

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
