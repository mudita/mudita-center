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
import {
  ProgressBar,
  Percentage,
  WarningBox,
} from "./recovery-mode-modal.styled"

interface RecoveryModeModalProps {
  open: boolean
  percent: number
  progressMessage: { id: string }
}

const messages = defineMessages({
  recoveryModeModalTitle: {
    id: "module.recoveryMode.harmony.title",
  },
  recoveryModeModalMessage: {
    id: "module.recoveryMode.modal.message",
  },
  recoveryModeModalWarning: {
    id: "module.recoveryMode.modal.warning",
  },
  recoveryModeModalWarningMessage: {
    id: "module.recoveryMode.modal.warningMessage",
  },
})

export const RecoveryModeModal: FunctionComponent<RecoveryModeModalProps> = ({
  open,
  percent,
  progressMessage,
}) => {
  return (
    <>
      <ModalDialog
        open={open}
        title={intl.formatMessage(messages.recoveryModeModalTitle)}
        size={ModalSize.Small}
        closeable={false}
        closeButton={false}
      >
        <ModalContent>
          <RoundIconWrapper>
            <Icon type={IconType.RecoveryModeBlack} width={4.8} />
          </RoundIconWrapper>
          <Text
            displayStyle={TextDisplayStyle.Headline4}
            message={messages.recoveryModeModalMessage}
          />
          <WarningBox>
            <Text
              displayStyle={TextDisplayStyle.Headline4}
              message={messages.recoveryModeModalWarning}
            />
            <Text
              displayStyle={TextDisplayStyle.Paragraph3}
              message={messages.recoveryModeModalWarningMessage}
            />
            <Text
              displayStyle={TextDisplayStyle.Paragraph4}
              message={intl.formatMessage(progressMessage)}
            />
            <ProgressBar>
              <span style={{ width: `${percent}%` }} />
            </ProgressBar>
            <Percentage
              displayStyle={TextDisplayStyle.Paragraph4}
              color="primary"
            >
              {percent}%
            </Percentage>
          </WarningBox>
        </ModalContent>
      </ModalDialog>
    </>
  )
}
