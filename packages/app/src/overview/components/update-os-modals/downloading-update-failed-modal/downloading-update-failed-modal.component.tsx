/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DownloadingUpdateFailedModalProps } from "App/overview/components/update-os-modals/downloading-update-failed-modal/downloading-update-failed-modal.interface"
import ErrorModal from "App/ui/components/error-modal/error-modal.component"
import { Size } from "App/__deprecated__/renderer/components/core/button/button.config"
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
  downloadingFailedContactSupport: {
    id: "module.overview.downloadingFailedContactSupport",
  },
  downloadingFailedGoToHelp: {
    id: "module.overview.downloadingFailedGoToHelp",
  },
})

export const DownloadingUpdateFailedModal: FunctionComponent<DownloadingUpdateFailedModalProps> =
  ({
    open,
    onContactSupport,
    onGoToHelp,
    onClose,
    testId,
  }: DownloadingUpdateFailedModalProps) => {
    return (
      <ErrorModal
        testId={testId}
        open={open}
        closeButton
        closeable
        closeModal={onClose}
        title={intl.formatMessage(messages.muditaOsUpdateTitle)}
        subtitle={intl.formatMessage(messages.downloadingFailedMessage)}
        body={intl.formatMessage(messages.downloadingFailedDescription)}
        onCloseButton={onContactSupport}
        closeButtonLabel={intl.formatMessage(
          messages.downloadingFailedContactSupport
        )}
        onActionButtonClick={onGoToHelp}
        actionButtonLabel={intl.formatMessage(
          messages.downloadingFailedGoToHelp
        )}
        onClose={onClose}
        actionButtonSize={Size.FixedSmall}
      />
    )
  }
