/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector, OutputSelector } from "reselect"
import { ReleaseProcessState } from "Core/update/constants"
import { OsRelease, ProcessedRelease } from "Core/update/dto"
import { UpdateOsState } from "Core/update/reducers/update-os.interface"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { updateStateSelector } from "Core/update/selectors/update-state-selector"

export enum Mode {
  DownloadedReleases = "downloaded-releases",
  InstalledReleases = "installed-releases",
}

export const alreadyProcessedReleasesSelector = (
  mode: Mode
): OutputSelector<
  ReduxRootState,
  OsRelease[],
  (res: UpdateOsState) => OsRelease[]
> => {
  return createSelector<ReduxRootState, UpdateOsState, OsRelease[]>(
    updateStateSelector,
    (state) => {
      let processedReleases: ProcessedRelease[] | null

      switch (mode) {
        case Mode.DownloadedReleases:
          processedReleases = state.data.downloadedProcessedReleases
          break
        case Mode.InstalledReleases:
          processedReleases = state.data.updateProcessedReleases
          break
      }

      return (processedReleases ?? [])
        .filter((item) => item.state === ReleaseProcessState.Done)
        .map((item) => item.release)
    }
  )
}
