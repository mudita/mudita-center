/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { UpdatingFailureWithHelpModalProps } from "App/overview/components/update-os-modals/updating-failure-with-help-modal/updating-failure-with-help-modal.interface"
import ErrorModal from "App/ui/components/error-modal/error-modal.component"
import { Size } from "App/__deprecated__/renderer/components/core/button/button.config"
import { intl } from "App/__deprecated__/renderer/utils/intl"
import React, { FunctionComponent } from "react"
import { defineMessages } from "react-intl"

const messages = defineMessages({
  muditaOsUpdateTitle: {
    id: "module.overview.muditaOsUpdateTitle",
  },
  updatingFailedTitle: {
    id: "module.overview.updatingFailedTitle",
  },
  updatingFailedDescription: {
    id: "module.overview.updatingFailedDescription",
  },
  updatingFailedSupportButton: {
    id: "module.overview.updatingFailedSupportButton",
  },
  updatingFailedHelpButton: {
    id: "module.overview.updatingFailedHelpButton",
  },
})

export const UpdatingFailureWithHelpModal: FunctionComponent<
  UpdatingFailureWithHelpModalProps
> = ({
  onContact,
  onHelp,
  onClose,
  open,
  testId,
}: UpdatingFailureWithHelpModalProps) => {
  return (
    <ErrorModal
      testId={testId}
      open={open}
      closeButton
      closeable
      closeModal={onClose}
      title={intl.formatMessage(messages.muditaOsUpdateTitle)}
      subtitle={intl.formatMessage(messages.updatingFailedTitle)}
      body={intl.formatMessage(messages.updatingFailedDescription)}
      onCloseButton={onContact}
      closeButtonLabel={intl.formatMessage(
        messages.updatingFailedSupportButton
      )}
      onActionButtonClick={onHelp}
      actionButtonLabel={intl.formatMessage(messages.updatingFailedHelpButton)}
      onClose={onClose}
      actionButtonSize={Size.FixedSmall}
    />
  )
}
