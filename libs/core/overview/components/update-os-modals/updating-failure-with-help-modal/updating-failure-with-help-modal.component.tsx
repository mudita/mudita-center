/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { UpdatingFailureWithHelpModalProps } from "Core/overview/components/update-os-modals/updating-failure-with-help-modal/updating-failure-with-help-modal.interface"
import ErrorModal from "Core/ui/components/error-modal/error-modal.component"
import { Size } from "Core/__deprecated__/renderer/components/core/button/button.config"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
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
  ...rest
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
      actionButtonSize={Size.FixedSmall}
      {...rest}
    />
  )
}
