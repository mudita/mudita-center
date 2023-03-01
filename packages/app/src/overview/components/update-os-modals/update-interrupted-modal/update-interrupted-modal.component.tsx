/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { UpdateInterruptedModalProps } from "App/overview/components/update-os-modals/update-interrupted-modal/update-interrupted-modal.interface"
import ErrorModal from "App/ui/components/error-modal/error-modal.component"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { intl, textFormatters } from "App/__deprecated__/renderer/utils/intl"
import React, { useMemo } from "react"
import { defineMessages } from "react-intl"

const messages = defineMessages({
  muditaOsUpdateTitle: {
    id: "module.overview.muditaOsUpdateTitle",
  },
  updatingAbortedSubtitle: {
    id: "module.overview.updatingAbortedSubtitle",
  },
  updatingAbortedBody: {
    id: "module.overview.updatingAbortedBody",
  },
  updatingAbortedInstruction: {
    id: "module.overview.updatingAbortedInstruction",
  },
  updatingAbortedCloseButton: {
    id: "module.overview.updatingAbortedCloseButton",
  },
})

export const UpdateInterruptedModal: FunctionComponent<UpdateInterruptedModalProps> =
  ({ open, onClose, testId, alreadyInstalledReleases }) => {
    const formattedVersionsText = useMemo(
      () =>
        alreadyInstalledReleases
          .map((release) => `MuditaOS v${release.version}`)
          .join(" / "),
      [alreadyInstalledReleases]
    )

    return (
      <ErrorModal
        testId={testId}
        open={open}
        closeButton={false}
        actionButtonLabel={intl.formatMessage(
          messages.updatingAbortedCloseButton
        )}
        onActionButtonClick={onClose}
        closeModal={onClose}
        title={intl.formatMessage(messages.muditaOsUpdateTitle)}
        subtitle={intl.formatMessage(messages.updatingAbortedSubtitle)}
        body={
          formattedVersionsText.length > 0
            ? {
                ...messages.updatingAbortedBody,
                values: {
                  versionsAmount: formattedVersionsText.length,
                  data: formattedVersionsText,
                  ...textFormatters,
                },
              }
            : undefined
        }
        subbody={intl.formatMessage(messages.updatingAbortedInstruction)}
      />
    )
  }
