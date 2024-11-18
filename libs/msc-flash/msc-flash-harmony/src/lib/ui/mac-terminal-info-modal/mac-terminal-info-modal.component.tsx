/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import styled from "styled-components"
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

interface MacTerminalInfoModalProps {
  open: boolean
  onClose: () => void
}

const messages = defineMessages({
  macTerminalInfoModalTitle: {
    id: "module.recoveryMode.harmony.title",
  },
  macTerminalInfoModalSubtitle: {
    id: "module.recoveryMode.modal.terminalInfo.subtitle",
  },
  macTerminalInfoModalDescription: {
    id: "module.recoveryMode.modal.terminalInfo.description",
  },
  macTerminalInfoModalStep1: {
    id: "module.recoveryMode.modal.terminalInfo.step1",
  },
  macTerminalInfoModalStep2: {
    id: "module.recoveryMode.modal.terminalInfo.step2",
  },
  macTerminalInfoModalStep3: {
    id: "module.recoveryMode.modal.terminalInfo.step3",
  },
  macTerminalInfoModalStep4: {
    id: "module.recoveryMode.modal.terminalInfo.step4",
  },
})

export const MacTerminalInfoModal: FunctionComponent<
  MacTerminalInfoModalProps
> = ({ open, onClose }) => {
  return (
    <>
      <ModalDialog
        open={open}
        title={intl.formatMessage(messages.macTerminalInfoModalTitle)}
        size={ModalSize.Small}
        closeable={true}
        closeButton={false}
        closeModal={onClose}
      >
        <ModalContent>
          <RoundIconWrapper>
            <Icon type={IconType.CheckCircleBlack} width={4.8} />
          </RoundIconWrapper>
          <Text
            displayStyle={TextDisplayStyle.Headline4}
            message={messages.macTerminalInfoModalSubtitle}
          />
          <Descrption>
            <Text
              displayStyle={TextDisplayStyle.Headline5}
              message={messages.macTerminalInfoModalDescription}
            />
          </Descrption>
          <StepsInfo>
            <Text
              displayStyle={TextDisplayStyle.Paragraph3}
              message={messages.macTerminalInfoModalStep1}
            />
            <Text
              displayStyle={TextDisplayStyle.Paragraph3}
              message={messages.macTerminalInfoModalStep2}
            />
            <Text
              displayStyle={TextDisplayStyle.Paragraph3}
              message={messages.macTerminalInfoModalStep3}
            />
            <Text
              displayStyle={TextDisplayStyle.Paragraph3}
              message={messages.macTerminalInfoModalStep4}
            />
          </StepsInfo>
        </ModalContent>
      </ModalDialog>
    </>
  )
}

const StepsInfo = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 1.2rem;
`

const Descrption = styled.div`
  margin-top: 0.8rem;
`
