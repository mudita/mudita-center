/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Icon from "Core/__deprecated__/renderer/components/core/icon/icon.component"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import React from "react"
import { defineMessages } from "react-intl"
import { ModalSize } from "Core/__deprecated__/renderer/components/core/modal/modal.interface"
import { ModalContent, ModalDialog, RoundIconWrapper } from "Core/ui"
import { IconType } from "Core/__deprecated__/renderer/components/core/icon/icon-type"
import Text, {
  TextDisplayStyle,
} from "Core/__deprecated__/renderer/components/core/text/text.component"

interface ErrorHandlingModalProps {
  open: boolean
  onClose: () => void
}

const messages = defineMessages({
  errorHandlingModalTitle: {
    id: "module.recoveryMode.harmony.title",
  },
  errorHandlingModalSubtitle: {
    id: "module.recoveryMode.modal.error.subtitle",
  },
  errorHandlingModalMessage: {
    id: "module.recoveryMode.modal.error.message",
  },
})

export const ErrorHandlingModal: FunctionComponent<ErrorHandlingModalProps> = ({
  open,
  onClose,
}) => {
  return (
    <>
      <ModalDialog
        open={open}
        title={intl.formatMessage(messages.errorHandlingModalTitle)}
        size={ModalSize.Small}
        closeable={true}
        onCloseButton={onClose}
        onClose={onClose}
      >
        <ModalContent>
          <RoundIconWrapper>
            <Icon type={IconType.RecoveryModeBlack} width={4.8} />
          </RoundIconWrapper>
          <Text
            displayStyle={TextDisplayStyle.Headline4}
            message={messages.errorHandlingModalSubtitle}
          />
          <Text
            displayStyle={TextDisplayStyle.Paragraph4}
            message={messages.errorHandlingModalMessage}
          />
        </ModalContent>
      </ModalDialog>
    </>
  )
}
