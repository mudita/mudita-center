/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { defineMessages } from "react-intl"
import { ModalContent, ModalDialog, RoundIconWrapper } from "Core/ui"
import Icon from "Core/__deprecated__/renderer/components/core/icon/icon.component"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import { ModalSize } from "Core/__deprecated__/renderer/components/core/modal/modal.interface"
import { IconType } from "Core/__deprecated__/renderer/components/core/icon/icon-type"
import Text, {
  TextDisplayStyle,
} from "Core/__deprecated__/renderer/components/core/text/text.component"
import { selectFlashingProcessState } from "../../selectors"
import { FlashingProcessState } from "../../constants"
import { setFlashingProcessState } from "../../actions"

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

export const FlashingErrorModal: FunctionComponent = () => {
  const dispatch = useDispatch()
  const flashingProcessState = useSelector(selectFlashingProcessState)
  const opened = flashingProcessState === FlashingProcessState.Failed

  const onClose = () => {
    dispatch(setFlashingProcessState(FlashingProcessState.Idle))
  }

  return (
    <>
      <ModalDialog
        open={opened}
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
