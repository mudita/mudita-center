/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent } from "react"
import { defineMessages } from "react-intl"
import ErrorModal from "Core/ui/components/error-modal/error-modal.component"
import { Size } from "Core/__deprecated__/renderer/components/core/button/button.config"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import {
  CheckForForceUpdateFailedModalProps
} from "Core/overview/components/update-os-modals/check-for-force-update-failed-modal/check-for-force-update-failed-modal.interface"

const messages = defineMessages({
  muditaOsUpdateTitle: {
    id: "module.overview.muditaOsUpdateTitle",
  },
  checkForUpdateFailedTitle: {
    id: "module.overview.checkForForceUpdateFailedTitle",
  },
  checkForUpdateFailedDescription: {
    id: "module.overview.checkForForceUpdateFailedDescription",
  },
  checkForUpdateFailedSupportButton: {
    id: "module.overview.checkForUpdateFailedSupportButton",
  },
  checkForUpdateFailedTryAgainButton: {
    id: "module.overview.checkForUpdateFailedTryAgainButton",
  },
})

export const CheckForForceUpdateFailedModal: FunctionComponent<
  CheckForForceUpdateFailedModalProps
> = ({
  onContactSupport,
  onTryAgain,
  open,
  testId,
  ...rest
}: CheckForForceUpdateFailedModalProps) => {
  return (
    <ErrorModal
      testId={testId}
      open={open}
      closeButton
      closeable
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
      {...rest}
    />
  )
}
