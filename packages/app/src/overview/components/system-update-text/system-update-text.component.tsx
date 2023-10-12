/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { SystemUpdateTextProps } from "App/overview/components/system-update-text/system-update-text.interface"
import { AvailableUpdateText } from "App/overview/components/system-update-text/system-update-text.styled"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import React from "react"
import { defineMessages, FormattedMessage } from "react-intl"
import { useSelector } from "react-redux"
import { ReduxRootState } from "App/__deprecated__/renderer/store"
import { DownloadState } from "App/update/constants"
import { State } from "App/core/constants"

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
  updateDownloaded,
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
  } else if (updateDownloaded) {
    return (
      <AvailableUpdateText>
        <FormattedMessage {...messages.systemUpdateDownloaded} />
      </AvailableUpdateText>
    )
  } else if (availableReleasesForUpdate?.length) {
    return (
      <AvailableUpdateText>
        <FormattedMessage
          {...messages.systemUpdateAvailable}
          values={{ version: availableReleasesForUpdate[0].version }}
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
