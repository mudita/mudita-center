/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import ErrorModal, {
  ErrorModalProps,
} from "App/ui/components/error-modal/error-modal.component"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { intl } from "App/__deprecated__/renderer/utils/intl"
import React from "react"
import { defineMessages } from "react-intl"
import { Size } from "App/__deprecated__/renderer/components/core/button/button.config"
import { ModalSize } from "App/__deprecated__/renderer/components/core/modal/modal.interface"

interface Props extends ErrorModalProps {
  onRetry: () => void
}

const messages = defineMessages({
  errorWithRetryButton: { id: "component.dataModalErrorWithRetryButton" },
})

export const ErrorWithRetryModal: FunctionComponent<Props> = ({
  onRetry,
  ...rest
}) => (
  <ErrorModal
    actionButtonLabel={intl.formatMessage(messages.errorWithRetryButton)}
    onActionButtonClick={onRetry}
    actionButtonSize={Size.FixedSmall}
    size={ModalSize.Small}
    {...rest}
  />
)
