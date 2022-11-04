/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DownloadingUpdateCancelledModalProps } from "App/overview/components/modals/downloading-update-cancelled-modal/downloading-update-cancelled-modal.interface"
import ErrorModal from "App/ui/components/error-modal/error-modal.component"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { intl } from "App/__deprecated__/renderer/utils/intl"
import React from "react"
import { defineMessages } from "react-intl"

const messages = defineMessages({
  muditaOsUpdateTitle: {
    id: "module.overview.muditaOsUpdateTitle",
  },
  downloadingCancelledMessage: {
    id: "module.overview.downloadingCancelledMessage",
  },
})

export const DownloadingUpdateCancelledModal: FunctionComponent<
  DownloadingUpdateCancelledModalProps
> = ({ open, onClose }) => {
  return (
    <ErrorModal
      open={open}
      onClose={onClose}
      closeModal={onClose}
      title={intl.formatMessage(messages.muditaOsUpdateTitle)}
      subtitle={intl.formatMessage(messages.downloadingCancelledMessage)}
    />
  )
}
