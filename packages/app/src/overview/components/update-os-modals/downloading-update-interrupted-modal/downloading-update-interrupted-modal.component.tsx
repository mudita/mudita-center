/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DownloadingUpdateInterruptedModalProps } from "App/overview/components/update-os-modals/downloading-update-interrupted-modal/downloading-update-interrupted-modal.interface"
import ErrorModal from "App/ui/components/error-modal/error-modal.component"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { intl, textFormatters } from "App/__deprecated__/renderer/utils/intl"
import React from "react"
import { defineMessages } from "react-intl"

const messages = defineMessages({
  muditaOsUpdateTitle: {
    id: "module.overview.muditaOsUpdateTitle",
  },
  downloadingAbortedSubtitle: {
    id: "module.overview.downloadingAbortedSubtitle",
  },
  downloadingAbortedBody: {
    id: "module.overview.downloadingAbortedBody",
  },
  downloadingAbortedInstruction: {
    id: "module.overview.downloadingAbortedInstruction",
  },
  downloadingAbortedCloseButton: {
    id: "module.overview.downloadingAbortedCloseButton",
  },
})

export const DownloadingUpdateInterruptedModal: FunctionComponent<DownloadingUpdateInterruptedModalProps> =
  ({ open, onClose, testId, alreadyDownloadedReleases }) => {
    const formattedVersionsText = alreadyDownloadedReleases
      .map((release) => `MuditaOS v${release.version}`)
      .join(" / ")

    return (
      <ErrorModal
        testId={testId}
        open={open}
        closeButton={false}
        actionButtonLabel={intl.formatMessage(
          messages.downloadingAbortedCloseButton
        )}
        onActionButtonClick={onClose}
        closeModal={onClose}
        title={intl.formatMessage(messages.muditaOsUpdateTitle)}
        subtitle={intl.formatMessage(messages.downloadingAbortedSubtitle)}
        body={{
          ...messages.downloadingAbortedBody,
          values: {
            versionsAmount: alreadyDownloadedReleases.length,
            data: formattedVersionsText,
            ...textFormatters,
          },
        }}
        subbody={intl.formatMessage(messages.downloadingAbortedInstruction)}
      />
    )
  }
