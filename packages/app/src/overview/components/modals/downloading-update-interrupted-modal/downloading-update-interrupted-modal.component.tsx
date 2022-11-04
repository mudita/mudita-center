/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DownloadingUpdateInterruptedModalProps } from "App/overview/components/modals/downloading-update-interrupted-modal/downloading-update-interrupted-modal.interface"
import { ErrorWithRetryModal } from "App/ui/components/error-with-retry/error-with-retry.component"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { intl } from "App/__deprecated__/renderer/utils/intl"
import React from "react"
import { defineMessages } from "react-intl"

const messages = defineMessages({
  muditaOsUpdateTitle: {
    id: "module.overview.muditaOsUpdateTitle",
  },
  downloadingFailedMessage: {
    id: "module.overview.downloadingFailedMessage",
  },
  downloadingFailedDescription: {
    id: "module.overview.downloadingFailedDescription",
  },
})

export const DownloadingUpdateInterruptedModal: FunctionComponent<
  DownloadingUpdateInterruptedModalProps
> = ({ onRetry, open, onClose }: DownloadingUpdateInterruptedModalProps) => {
  return (
    <ErrorWithRetryModal
      closeable
      closeButton
      closeModal={onClose}
      onClose={onClose}
      onRetry={onRetry}
      open={open}
      title={intl.formatMessage(messages.muditaOsUpdateTitle)}
      subtitle={intl.formatMessage(messages.downloadingFailedMessage)}
      body={intl.formatMessage(messages.downloadingFailedDescription)}
    />
  )
}
