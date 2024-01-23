/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { SystemUpdateTextProps } from "Core/overview/components/system-update-text/system-update-text.interface"
import { AvailableUpdateText } from "Core/overview/components/system-update-text/system-update-text.styled"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import React from "react"
import { defineMessages, FormattedMessage } from "react-intl"
import { useSelector } from "react-redux"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { DownloadState } from "Core/update/constants"
import { State } from "Core/core/constants"

const messages = defineMessages({
  systemUpdateDownloaded: {
    id: "module.overview.systemUpdateDownloaded",
  },
  systemUpdateAvailable: {
    id: "module.overview.systemUpdateAvailable",
  },
  systemUpdateUpToDate: {
    id: "module.overview.systemUpdateUpToDate",
  },
  systemUpdateCheckFailed: {
    id: "module.overview.systemUpdateCheckFailed",
  },
})

export const SystemUpdateText: FunctionComponent<SystemUpdateTextProps> = ({
  checkForUpdateFailed,
  checkForUpdateInProgress,
  checkForUpdatePerformed,
}) => {
  const { data, updateOsState, downloadState } = useSelector(
    (state: ReduxRootState) => state.update
  )
  const { availableReleasesForUpdate } = data
  if (
    checkForUpdateInProgress ||
    updateOsState === State.Loading ||
    downloadState === DownloadState.Loading
  ) {
    return null
  }
  if (checkForUpdateFailed) {
    return (
      <AvailableUpdateText>
        <FormattedMessage {...messages.systemUpdateCheckFailed} />
      </AvailableUpdateText>
    )
  } else if (availableReleasesForUpdate?.length) {
    return (
      <AvailableUpdateText>
        <FormattedMessage
          {...messages.systemUpdateAvailable}
          values={{
            version:
              availableReleasesForUpdate[availableReleasesForUpdate.length - 1]
                .version,
          }}
        />
      </AvailableUpdateText>
    )
  } else if (checkForUpdatePerformed) {
    return (
      <AvailableUpdateText>
        <FormattedMessage {...messages.systemUpdateUpToDate} />
      </AvailableUpdateText>
    )
  }
  return null
}
