/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { CheckForUpdateFailedModalProps } from "App/overview/components/update-os-modals/check-for-update-failed-modal/check-for-update-failed-modal.interface"
import ErrorModal from "App/ui/components/error-modal/error-modal.component"
import { Size } from "App/__deprecated__/renderer/components/core/button/button.config"
import { intl } from "App/__deprecated__/renderer/utils/intl"
import React, { FunctionComponent } from "react"
import { defineMessages } from "react-intl"

const messages = defineMessages({
  muditaOsUpdateTitle: {
    id: "module.overview.muditaOsUpdateTitle",
  },
  checkForUpdateFailedTitle: {
    id: "module.overview.checkForUpdateFailedTitle",
  },
  checkForUpdateFailedDescription: {
    id: "module.overview.checkForUpdateFailedDescription",
  },
  checkForUpdateFailedSupportButton: {
    id: "module.overview.checkForUpdateFailedSupportButton",
  },
  checkForUpdateFailedTryAgainButton: {
    id: "module.overview.checkForUpdateFailedTryAgainButton",
  },
})

export const CheckForUpdateFailedModal: FunctionComponent<CheckForUpdateFailedModalProps> =
  ({
    onContactSupport,
    onTryAgain,
    onClose,
    open,
    testId,
  }: CheckForUpdateFailedModalProps) => {
    return (
      <ErrorModal
        testId={testId}
        open={open}
        closeButton
        closeable
        closeModal={onClose}
        title={intl.formatMessage(messages.muditaOsUpdateTitle)}
        subtitle={intl.formatMessage(messages.checkForUpdateFailedTitle)}
        body={intl.formatMessage(messages.checkForUpdateFailedDescription)}
        onCloseButton={onContactSupport}
        closeButtonLabel={intl.formatMessage(
          messages.checkForUpdateFailedSupportButton
        )}
        onActionButtonClick={onTryAgain}
        actionButtonLabel={intl.formatMessage(
          messages.checkForUpdateFailedTryAgainButton
        )}
        actionButtonSize={Size.FixedSmall}
      />
    )
  }
