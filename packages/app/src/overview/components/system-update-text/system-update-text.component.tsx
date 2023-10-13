/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { SystemUpdateTextProps } from "App/overview/components/system-update-text/system-update-text.interface"
import { AvailableUpdateText } from "App/overview/components/system-update-text/system-update-text.styled"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import React from "react"
import { defineMessages, FormattedMessage } from "react-intl"

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
  updateAvailable,
  updateDownloaded,
  checkForUpdateInProgress,
  checkForUpdatePerformed,
  checkForUpdateFailed,
}) => {
  if (checkForUpdateFailed) {
    return (
      <AvailableUpdateText>
        <FormattedMessage {...messages.systemUpdateCheckFailed} />
      </AvailableUpdateText>
    )
  }

  if (checkForUpdateInProgress) {
    return null
  }

  if (!checkForUpdatePerformed) {
    return null
  }

  if (updateAvailable && updateDownloaded) {
    return (
      <AvailableUpdateText>
        <FormattedMessage {...messages.systemUpdateDownloaded} />
      </AvailableUpdateText>
    )
  }

  if (updateAvailable && !updateDownloaded) {
    return (
      <AvailableUpdateText>
        <FormattedMessage {...messages.systemUpdateAvailable} />
      </AvailableUpdateText>
    )
  }

  return (
    <AvailableUpdateText>
      <FormattedMessage {...messages.systemUpdateUpToDate} />
    </AvailableUpdateText>
  )
}
