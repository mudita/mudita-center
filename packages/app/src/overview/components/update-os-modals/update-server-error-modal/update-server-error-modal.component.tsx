/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { UpdateServerErrorModalProps } from "App/overview/components/update-os-modals/update-server-error-modal/update-server-error-modal.interface"
import { ErrorWithRetryModal } from "App/ui/components/error-with-retry/error-with-retry.component"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { intl } from "App/__deprecated__/renderer/utils/intl"
import React from "react"
import { defineMessages } from "react-intl"

const messages = defineMessages({
  muditaOsUpdateTitle: {
    id: "module.overview.muditaOsUpdateTitle",
  },
  checkingUpdateFailedMessage: {
    id: "module.overview.checkingUpdateFailedMessage",
  },
  checkingUpdateFailedDescription: {
    id: "module.overview.checkingUpdateFailedDescription",
  },
})

export const UpdateServerErrorModal: FunctionComponent<
  UpdateServerErrorModalProps
> = ({ onRetry, open, onClose }: UpdateServerErrorModalProps) => {
  return (
    <ErrorWithRetryModal
      open={open}
      closeButton
      closeable
      closeModal={onClose}
      onClose={onClose}
      onRetry={onRetry}
      title={intl.formatMessage(messages.muditaOsUpdateTitle)}
      subtitle={intl.formatMessage(messages.checkingUpdateFailedMessage)}
      body={intl.formatMessage(messages.checkingUpdateFailedDescription)}
    />
  )
}
